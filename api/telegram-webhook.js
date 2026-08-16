const { put } = require('@vercel/blob');

// Set these in the Vercel project environment variables:
//   TELEGRAM_BOT_TOKEN       - token from @BotFather (e.g. 123456:ABC-DEF...)
//   TELEGRAM_WEBHOOK_SECRET  - random string, used to verify requests come from Telegram
//   TELEGRAM_OWNER_ID        - your numeric Telegram chat id
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || '';
const TELEGRAM_OWNER_ID = process.env.TELEGRAM_OWNER_ID || '';
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_hsNf951gsDGCzL1Y_QqPWenRrxEjHQ8PDVldxfXrH5xTXLK';

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB safety cap
const PHOTO_PATHNAME = 'profile_photo.jpg';
const RESUME_PATHNAME = 'resume.pdf';
const MANIFEST_PATHNAME = 'manifest.json';
const MANIFEST_URL = 'https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json';

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', () => resolve(''));
  });
}

async function tgRequest(method, params) {
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return res.json().catch(() => ({}));
}

async function reply(chatId, text) {
  try {
    await tgRequest('sendMessage', { chat_id: chatId, text });
  } catch (err) {
    // Replying is best-effort; never let it break the webhook ack.
  }
}

async function downloadFile(fileId) {
  const fileInfo = await tgRequest('getFile', { file_id: fileId });
  if (!fileInfo.ok || !fileInfo.result || !fileInfo.result.file_path) {
    throw new Error('Telegram getFile failed: ' + JSON.stringify(fileInfo));
  }
  const fileSize = fileInfo.result.file_size || 0;
  if (fileSize > MAX_FILE_BYTES) throw new Error('File is too large (max 20 MB)');

  const res = await fetch(`https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileInfo.result.file_path}`);
  if (!res.ok) throw new Error('Failed to download file from Telegram (' + res.status + ')');
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.byteLength > MAX_FILE_BYTES) throw new Error('File is too large (max 20 MB)');
  return buffer;
}

// Updates manifest.json so the live site instantly serves the new asset.
// The frontend reads this file to know the current photo/resume URLs.
async function updateManifest(updates) {
  let existing = {};
  try {
    const mRes = await fetch(MANIFEST_URL + '?t=' + Date.now());
    if (mRes.ok) existing = await mRes.json();
  } catch (e) {}

  const merged = Object.assign({}, existing, updates, { updatedAt: Date.now() });
  const buffer = Buffer.from(JSON.stringify(merged, null, 2));

  await put(MANIFEST_PATHNAME, buffer, {
    access: 'public',
    token: BLOB_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json'
  });
}

async function savePhoto(buffer) {
  const blob = await put(PHOTO_PATHNAME, buffer, {
    access: 'public',
    token: BLOB_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'image/jpeg',
    cacheControlMaxAge: 300
  });
  await updateManifest({
    photoUrl: blob.url,
    photoTimestamp: Date.now()
  });
  return blob.url;
}

async function saveResume(buffer, filename) {
  const blob = await put(RESUME_PATHNAME, buffer, {
    access: 'public',
    token: BLOB_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/pdf',
    cacheControlMaxAge: 300
  });
  const downloadUrl = blob.downloadUrl || (blob.url + '?download=1');
  await updateManifest({
    resumeUrl: blob.url,
    resumeDownloadUrl: downloadUrl,
    resumeName: filename || 'Ketan_Mahajan_Resume.pdf',
    resumeTimestamp: Date.now()
  });
  return blob.url;
}

function largestPhoto(photo) {
  return photo.reduce((best, p) => (p.file_size || 0) > (best.file_size || 0) ? p : best, photo[0]);
}

module.exports = async function handler(req, res) {
  const requestSecret = req.headers['x-telegram-bot-api-secret-token'] || '';
  const pathToken = String(req.url || '').split('?')[0].split('/').pop();
  const isAuthorized =
    (TELEGRAM_WEBHOOK_SECRET && requestSecret === TELEGRAM_WEBHOOK_SECRET) ||
    (TELEGRAM_BOT_TOKEN && pathToken === TELEGRAM_BOT_TOKEN);

  if (!isAuthorized) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const raw = await readBody(req);
  let update = null;
  try {
    update = raw ? JSON.parse(raw) : null;
  } catch (err) {
    update = null;
  }
  if (!update || !TELEGRAM_BOT_TOKEN) {
    return res.status(200).json({ ok: true });
  }

  const message = update.message || update.edited_message;
  if (!message || !message.chat || !message.chat.id) {
    return res.status(200).json({ ok: true });
  }

  const chatId = message.chat.id;
  if (!TELEGRAM_OWNER_ID) {
    await reply(chatId, 'This bot is not configured yet. The owner must set TELEGRAM_OWNER_ID.');
    return res.status(200).json({ ok: true, ignored: true });
  }
  if (String(chatId) !== String(TELEGRAM_OWNER_ID)) {
    await reply(chatId, 'You are not authorized to update this site.');
    return res.status(200).json({ ok: true, ignored: true });
  }

  try {
    const photo = (message.photo && message.photo.length) ? largestPhoto(message.photo) : null;
    const document = message.document || null;
    const mime = (document && document.mime_type) || '';
    const fileName = (document && document.file_name) || '';
    const isPdf = mime === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');

    if (photo) {
      const buffer = await downloadFile(photo.file_id);
      await savePhoto(buffer);
      await reply(chatId, 'Profile photo updated! Give it a minute to reach the site.');
      return res.status(200).json({ ok: true, kind: 'photo' });
    }

    if (document && isPdf) {
      const buffer = await downloadFile(document.file_id);
      await saveResume(buffer, fileName);
      await reply(chatId, 'Resume updated! The download link now serves your new PDF.');
      return res.status(200).json({ ok: true, kind: 'resume' });
    }

    if (document && mime.startsWith('image/')) {
      const buffer = await downloadFile(document.file_id);
      await savePhoto(buffer);
      await reply(chatId, 'Profile photo updated! Give it a minute to reach the site.');
      return res.status(200).json({ ok: true, kind: 'photo' });
    }

    await reply(chatId, 'Send me a photo to update the profile picture, or a PDF file to update the resume.');
    return res.status(200).json({ ok: true });
  } catch (err) {
    await reply(chatId, 'Failed to update: ' + (err && err.message ? err.message : 'unknown error'));
    return res.status(500).json({ ok: false, error: err && err.message ? err.message : String(err) });
  }
};
