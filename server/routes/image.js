const router = require('express').Router();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const { Photo } = require('../models');

router.get('/i/:imageId', async (req, res) => {
  try {
    const imageId = req.params.imageId.substr(0, 24);
    const { h, w } = req.query;
    const image = await Photo.findById(imageId).select('name type');
    const imagePath = path.join(__dirname, '..', 'storage', image.name);
    if (fs.existsSync(imagePath)) {
      const buffer = await sharp(imagePath)
        .resize(Math.floor(w) || null, Math.floor(h) || null, { fit: 'cover' })
        .toBuffer();
      res.setHeader('Content-Type', image.type);
      res.send(buffer);
    } else {
      res.status(404).send('No image found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;
