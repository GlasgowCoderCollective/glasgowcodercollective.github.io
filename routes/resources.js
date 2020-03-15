/* eslint-disable max-len */

const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const Upload = require('../models/upload');

const uploadPath = path.resolve(`${__dirname}`, '..', 'uploads');
const uploads = multer({ dest: uploadPath });

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
});

const updateDatabase = (fileInfo, displayName) => {
  const payload = new Upload({
    fileName: fileInfo.filename,
    originalFileName: fileInfo.originalname,
    mimeType: fileInfo.mimetype,
    size: fileInfo.size,
    uploader: displayName,
  });

  return payload.save();
};

const cleanupFiles = (filePath) => new Promise((resolve, reject) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      return reject(err);
    }

    return resolve();
  });
});

router.get('/list', (req, res) => {
  Upload.find({})
    .then((data) => res.json({ error: false, resources: data }))
    .catch((error) => res.json({ error: true, message: error }));
});

router.get('/download/:filename', (req, res) => {
  Upload.findOne({ originalFileName: req.params.filename })
    .then((doc) => {
      const params = {
        Bucket: process.env.UPLOADS_BUCKET,
        Key: doc.fileName,
      };
      const stream = s3.getObject(params).createReadStream();

      res.set(
        'Content-Disposition',
        `attachment; filename=${doc.originalFileName}`,
      );

      stream.pipe(res);
    });
});

router.post('/upload', uploads.single('resource'), (req, res) => {
  const { file } = req;

  const params = {
    Bucket: process.env.UPLOADS_BUCKET,
    Key: file.filename,
    Body: fs.createReadStream(file.path),
  };
  s3.putObject(params).promise()
    .then(updateDatabase(file, req.user.displayName))
    .then(() => res.redirect('/resources?success=true'))
    .catch(() => res.redirect('/resources?success=false'))
    .finally(cleanupFiles(file.path));
});

module.exports = router;
