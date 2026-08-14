const { list } = require('@vercel/blob');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_hsNf951gsDGCzL1Y_QqPWenRrxEjHQ8PDVldxfXrH5xTXLK';
    const { blobs } = await list({ token });

    let photoBlob = blobs.find(b => b.pathname === 'profile_photo.jpg' || b.pathname.endsWith('photo.jpg'));
    let resumeBlob = blobs.find(b => b.pathname === 'resume.pdf' || b.pathname.endsWith('Resume.pdf') || b.pathname.endsWith('.pdf'));

    return res.status(200).json({
      success: true,
      photo: {
        url: photoBlob ? photoBlob.url : 'profile/photo.jpg',
        uploadedAt: photoBlob ? photoBlob.uploadedAt : null
      },
      resume: {
        url: resumeBlob ? (resumeBlob.downloadUrl || resumeBlob.url) : 'resume/Ketan_Mahajan_Resume.pdf',
        uploadedAt: resumeBlob ? resumeBlob.uploadedAt : null
      }
    });
  } catch (err) {
    console.error('Error fetching blobs:', err);
    return res.status(200).json({
      success: false,
      photo: { url: 'profile/photo.jpg' },
      resume: { url: 'resume/Ketan_Mahajan_Resume.pdf' },
      error: err.message
    });
  }
};
