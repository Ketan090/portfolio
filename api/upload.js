import { handleUpload } from '@vercel/blob';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  try {
    const body = await readBody(req);
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('blob uploaded', blob.url);
      }
    });
    res.status(200).json(result);
  } catch (err) {
    console.error('upload handler error', err);
    res.status(500).json({ error: err && err.message ? err.message : String(err) });
  }
}