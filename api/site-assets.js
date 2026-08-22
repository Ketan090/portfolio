const { head, list } = require('@vercel/blob');

const ASSETS = {
  photo: { pathname: 'profile_photo.jpg', type: 'photo' },
  resume: { pathname: 'resume.pdf', type: 'resume' }
};

function siteOrigin(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const host = (req && req.headers && (req.headers['x-forwarded-host'] || req.headers.host)) || '';
  if (host) return 'https://' + String(host).split(',')[0].trim();
  return 'https://portfolio-lilac-seven.vercel.app';
}

function fallbackPhotoUrl(origin) {
  return origin + '/profile/photo.jpg';
}

function fallbackResumeUrl(origin) {
  return origin + '/resume/Ketan_Mahajan_Resume.pdf';
}

function mapPathname(pathname) {
  const norm = String(pathname || '').split('/').pop();
  if (norm === 'profile_photo.jpg') return 'photo';
  if (norm === 'resume.pdf') return 'resume';
  return null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const origin = siteOrigin(req);

  try {
    const result = await list({ prefix: '', limit: 1000 });
    const blobs = Array.isArray(result) ? result : (result && result.blobs ? result.blobs : []);
    const byType = {};
    blobs.forEach((blob) => {
      const kind = mapPathname(blob.pathname);
      if (kind) byType[kind] = blob;
    });

    const photoBlob = byType.photo;
    const resumeBlob = byType.resume;

    if (photoBlob && photoBlob.pathname !== ASSETS.photo.pathname) {
      try {
        byType.photo = await head(photoBlob.pathname, { access: 'public' });
      } catch (err) {
        // head() failed; fall back to list() metadata
      }
    }

    let photo = null;
    let resume = null;

    if (photoBlob) {
      const b = byType.photo;
      photo = {
        url: b.url || fallbackPhotoUrl(origin),
        updatedAt: b.uploadedAt ? new Date(b.uploadedAt).toISOString() : null,
        etag: b.etag || null
      };
    }

    if (resumeBlob) {
      resume = {
        url: resumeBlob.url || fallbackResumeUrl(origin),
        downloadUrl: resumeBlob.downloadUrl || resumeBlob.url || fallbackResumeUrl(origin),
        updatedAt: resumeBlob.uploadedAt ? new Date(resumeBlob.uploadedAt).toISOString() : null,
        etag: resumeBlob.etag || null
      };
    }

    const payload = {
      ok: true,
      photo,
      resume,
      fallbacks: {
        photo: fallbackPhotoUrl(origin),
        resume: fallbackResumeUrl(origin)
      }
    };

    if (req.method === 'HEAD') {
      return res.status(200).end();
    }
    return res.status(200).json(payload);
  } catch (err) {
    const payload = {
      ok: false,
      error: err && err.message ? err.message : String(err),
      photo: null,
      resume: null,
      fallbacks: {
        photo: fallbackPhotoUrl(origin),
        resume: fallbackResumeUrl(origin)
      }
    };
    if (req.method === 'HEAD') {
      return res.status(500).end();
    }
    return res.status(500).json(payload);
  }
}
