const express = require('express');
const foodRouter = express.Router();
const { addFood, listFood,removeFood } = require('../controllers/foodController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list',listFood);
foodRouter.delete('/remove',removeFood)
module.exports = foodRouter;
