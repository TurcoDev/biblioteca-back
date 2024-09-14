const express = require('express');
const router = express.Router();
const booksAuthorsController = require('../controllers/booksAuthorsController');

router.get('/', booksAuthorsController.getAllBooksAuthors);
router.get('/:book_id/:author_id', booksAuthorsController.getBooksAuthorsById);
router.post('/', booksAuthorsController.createBooksAuthors);
router.put('/:book_id/:author_id', booksAuthorsController.updateBooksAuthors);
router.delete('/:book_id/:author_id', booksAuthorsController.deleteBooksAuthors);

module.exports = router;
