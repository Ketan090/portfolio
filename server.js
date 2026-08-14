const http = require('http');
const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_hsNf951gsDGCzL1Y_QqPWenRrxEjHQ8PDVldxfXrH5xTXLK';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) { // 50MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // API: Save Local & Cloud Permanently
  if (req.method === 'POST' && (pathname === '/api/save-local' || pathname === '/api/save')) {
    try {
      const body = await parseBody(req);
      const { type, data, filename } = body;

      if (!type || !data) {
        return sendJSON(res, 400, { success: false, error: 'Missing type or data' });
      }

      // Extract base64 data
      const matches = data.match(/^data:([A-Za-z0-9+/]+);base64,(.+)$/);
      const base64Data = matches ? matches[2] : data.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      if (type === 'photo') {
        // 1. Write to local file profile/photo.jpg
        const photoDir = path.join(ROOT_DIR, 'profile');
        if (!fs.existsSync(photoDir)) {
          fs.mkdirSync(photoDir, { recursive: true });
        }
        const targetPath = path.join(photoDir, 'photo.jpg');
        fs.writeFileSync(targetPath, buffer);
        const stats = fs.statSync(targetPath);

        // 2. Upload to Vercel Blob & Update Manifest
        let cloudUrl = null;
        try {
          const photoBlob = await put('profile_photo.jpg', buffer, {
            access: 'public',
            token: BLOB_TOKEN,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: 'image/jpeg'
          });
          cloudUrl = photoBlob.url;

          let existingManifest = {};
          try {
            const mRes = await fetch(`https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json?t=${Date.now()}`);
            if (mRes.ok) existingManifest = await mRes.json();
          } catch (e) {}

          await put('manifest.json', JSON.stringify({
            ...existingManifest,
            photoUrl: photoBlob.url,
            photoTimestamp: stats.mtimeMs,
            updatedAt: Date.now()
          }, null, 2), {
            access: 'public',
            token: BLOB_TOKEN,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: 'application/json'
          });
        } catch (cloudErr) {
          console.warn('Cloud sync note:', cloudErr.message);
        }

        return sendJSON(res, 200, {
          success: true,
          message: 'Profile photo stored and updated permanently',
          path: 'profile/photo.jpg',
          size: stats.size,
          mtime: stats.mtimeMs,
          url: `profile/photo.jpg?t=${stats.mtimeMs}`,
          cloudUrl: cloudUrl ? `${cloudUrl}?t=${stats.mtimeMs}` : null
        });
      } else if (type === 'resume') {
        // 1. Write to local file resume/Ketan_Mahajan_Resume.pdf
        const resumeDir = path.join(ROOT_DIR, 'resume');
        if (!fs.existsSync(resumeDir)) {
          fs.mkdirSync(resumeDir, { recursive: true });
        }
        const primaryPath = path.join(resumeDir, 'Ketan_Mahajan_Resume.pdf');
        fs.writeFileSync(primaryPath, buffer);

        const secondaryPath = path.join(resumeDir, 'resume.pdf');
        fs.writeFileSync(secondaryPath, buffer);
        const stats = fs.statSync(primaryPath);

        // 2. Upload to Vercel Blob & Update Manifest
        let cloudUrl = null;
        let downloadUrl = null;
        try {
          const resumeBlob = await put('resume.pdf', buffer, {
            access: 'public',
            token: BLOB_TOKEN,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: 'application/pdf'
          });
          cloudUrl = resumeBlob.url;
          downloadUrl = resumeBlob.downloadUrl || `${resumeBlob.url}?download=1`;

          let existingManifest = {};
          try {
            const mRes = await fetch(`https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json?t=${Date.now()}`);
            if (mRes.ok) existingManifest = await mRes.json();
          } catch (e) {}

          await put('manifest.json', JSON.stringify({
            ...existingManifest,
            resumeUrl: resumeBlob.url,
            resumeDownloadUrl: downloadUrl,
            resumeName: filename || 'Ketan_Mahajan_Resume.pdf',
            resumeTimestamp: stats.mtimeMs,
            updatedAt: Date.now()
          }, null, 2), {
            access: 'public',
            token: BLOB_TOKEN,
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: 'application/json'
          });
        } catch (cloudErr) {
          console.warn('Cloud sync note:', cloudErr.message);
        }

        return sendJSON(res, 200, {
          success: true,
          message: 'Resume stored and updated permanently',
          path: 'resume/Ketan_Mahajan_Resume.pdf',
          filename: filename || 'Ketan_Mahajan_Resume.pdf',
          size: stats.size,
          mtime: stats.mtimeMs,
          url: `resume/Ketan_Mahajan_Resume.pdf?t=${stats.mtimeMs}`,
          cloudUrl: cloudUrl ? `${cloudUrl}?t=${stats.mtimeMs}` : null,
          downloadUrl: downloadUrl || `resume/Ketan_Mahajan_Resume.pdf?t=${stats.mtimeMs}`
        });
      } else {
        return sendJSON(res, 400, { success: false, error: `Unknown type: ${type}` });
      }
    } catch (err) {
      console.error('Error saving file:', err);
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // API: Get Content Info / Status
  if (req.method === 'GET' && pathname === '/api/content') {
    try {
      const photoPath = path.join(ROOT_DIR, 'profile', 'photo.jpg');
      const resumePath = path.join(ROOT_DIR, 'resume', 'Ketan_Mahajan_Resume.pdf');

      const photoExists = fs.existsSync(photoPath);
      const resumeExists = fs.existsSync(resumePath);

      const photoStats = photoExists ? fs.statSync(photoPath) : null;
      const resumeStats = resumeExists ? fs.statSync(resumePath) : null;

      return sendJSON(res, 200, {
        success: true,
        photo: {
          exists: photoExists,
          url: photoExists ? `profile/photo.jpg?t=${photoStats.mtimeMs}` : 'profile/photo.jpg',
          mtime: photoStats ? photoStats.mtimeMs : null,
          size: photoStats ? photoStats.size : null
        },
        resume: {
          exists: resumeExists,
          url: resumeExists ? `resume/Ketan_Mahajan_Resume.pdf?t=${resumeStats.mtimeMs}` : 'resume/Ketan_Mahajan_Resume.pdf',
          mtime: resumeStats ? resumeStats.mtimeMs : null,
          size: resumeStats ? resumeStats.size : null
        }
      });
    } catch (err) {
      return sendJSON(res, 500, { success: false, error: err.message });
    }
  }

  // Static File Serving
  if (req.method === 'GET' || req.method === 'HEAD') {
    let filePath = path.join(ROOT_DIR, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));
    
    // Prevent path traversal
    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('Forbidden');
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        filePath = path.join(ROOT_DIR, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('File Not Found');
        }

        const cacheControl = ext === '.html' ? 'no-cache, must-revalidate' : 'public, max-age=3600';

        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': content.length,
          'Cache-Control': cacheControl
        });
        if (req.method === 'HEAD') {
          return res.end();
        }
        res.end(content);
      });
    });
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`Portfolio server is running permanently at http://localhost:${PORT}`);
});
