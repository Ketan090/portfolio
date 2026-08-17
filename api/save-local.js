const { put } = require('@vercel/blob');

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', () => resolve(''));
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_hsNf951gsDGCzL1Y_QqPWenRrxEjHQ8PDVldxfXrH5xTXLK';
    const raw = await readBody(req);

    let body;
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (e) {
      body = {};
    }

    const { type, data, filename } = body;

    if (!type || !data) {
      return res.status(400).json({ success: false, error: 'Missing type or data' });
    }

    const matches = data.match(/^data:([A-Za-z0-9+/]+);base64,(.+)$/);
    const base64Data = matches ? matches[2] : data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    if (type === 'photo') {
      const photoBlob = await put('profile_photo.jpg', buffer, {
        access: 'public',
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'image/jpeg'
      });

      let existingManifest = {};
      try {
        const mRes = await fetch(`https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json?t=${Date.now()}`);
        if (mRes.ok) existingManifest = await mRes.json();
      } catch (e) {}

      const manifestBlob = await put('manifest.json', JSON.stringify({
        ...existingManifest,
        photoUrl: photoBlob.url,
        photoTimestamp: Date.now(),
        updatedAt: Date.now()
      }, null, 2), {
        access: 'public',
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json'
      });

      return res.status(200).json({
        success: true,
        message: 'Profile photo stored and updated permanently',
        photoUrl: `${photoBlob.url}?t=${Date.now()}`,
        manifestUrl: manifestBlob.url
      });
    } else if (type === 'resume') {
      const resumeBlob = await put('resume.pdf', buffer, {
        access: 'public',
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/pdf'
      });

      const downloadUrl = resumeBlob.downloadUrl || `${resumeBlob.url}?download=1`;

      let existingManifest = {};
      try {
        const mRes = await fetch(`https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json?t=${Date.now()}`);
        if (mRes.ok) existingManifest = await mRes.json();
      } catch (e) {}

      const manifestBlob = await put('manifest.json', JSON.stringify({
        ...existingManifest,
        resumeUrl: resumeBlob.url,
        resumeDownloadUrl: downloadUrl,
        resumeName: filename || 'Ketan_Mahajan_Resume.pdf',
        resumeTimestamp: Date.now(),
        updatedAt: Date.now()
      }, null, 2), {
        access: 'public',
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json'
      });

      return res.status(200).json({
        success: true,
        message: 'Resume stored and updated permanently',
        resumeUrl: `${resumeBlob.url}?t=${Date.now()}`,
        downloadUrl: downloadUrl,
        manifestUrl: manifestBlob.url
      });
    } else {
      return res.status(400).json({ success: false, error: 'Unknown type' });
    }
  } catch (err) {
    console.error('Save-local error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
