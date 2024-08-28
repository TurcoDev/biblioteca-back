// routes/authors.js
const express = require('express');
const router = express.Router();
const { getAuthors, createAuthor, getAuthorById, updateAuthor, deleteAuthor } = require('../controllers/authorsController');

router.get('/', getAuthors);

router.post('/', createAuthor);

router.get('/:id', getAuthorById);

router.put('/:id', updateAuthor);

router.delete('/:id', deleteAuthor);

module.exports = router;
