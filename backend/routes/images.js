/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
// backend/routes/images.js

const express = require('express');
const router = express.Router();

// Import controller functions for handling image routes
const { getImages, deleteImage, updateImageStatus } = require('../controllers/images');

// Define routes
router.get('/', getImages);
router.post('/', imagesController.createImage);
router.delete('/:id', deleteImage);
router.put('/:id', updateImageStatus);

module.exports = router;
