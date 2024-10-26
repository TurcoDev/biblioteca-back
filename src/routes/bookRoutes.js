const express = require('express');
const router = express.Router();
const upload = require('../cloudinary/MulterConfig.js');
const bookController = require('../controllers/bookController.js');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/',upload.single('portada'), bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
