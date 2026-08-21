const { put, list, del } = require('@vercel/blob');

// Disable Vercel's default body parser so the manual readBody below
// can consume the raw request stream (the default parser intercepts it).
module.exports.config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 30,
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    const MAX_BYTES = 20 * 1024 * 1024;

    req.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BYTES) {
        req.destroy();
        reject(new Error('Request body too large (max 20 MB)'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
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
    
    // Helper: delete old blobs of a given prefix, keeping only the target pathname
    async function deleteOldBlobs(prefix, keepPathname) {
      try {
        const listed = await list({ token, prefix });
        for (const blob of listed.blobs) {
          if (blob.pathname !== keepPathname) {
            try {
              await del(blob.pathname, { token });
              console.log(`Deleted old blob: ${blob.pathname}`);
            } catch (e) {
              console.warn(`Failed to delete old blob ${blob.pathname}:`, e.message);
            }
          }
        }
      } catch (e) {
        console.warn('Blob listing failed (non-fatal):', e.message);
      }
    }

    const { type, data, filename } = body;

    if (!type || !data) {
      return res.status(400).json({ success: false, error: 'Missing type or data' });
    }

    const matches = data.match(/^data:([A-Za-z0-9+/]+);base64,(.+)$/);
    const base64Data = matches ? matches[2] : data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    if (type === 'photo') {
      await deleteOldBlobs('profile_photo', 'profile_photo.jpg');
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

      // Clean up any old suffixed manifest files
      await deleteOldBlobs('manifest', 'manifest.json');

      return res.status(200).json({
        success: true,
        message: 'Profile photo stored and updated permanently',
        photoUrl: `${photoBlob.url}?t=${Date.now()}`,
        manifestUrl: manifestBlob.url
      });
    } else if (type === 'resume') {
      await deleteOldBlobs('resume', 'resume.pdf');
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

      // Clean up any old suffixed manifest files
      await deleteOldBlobs('manifest', 'manifest.json');

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
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};