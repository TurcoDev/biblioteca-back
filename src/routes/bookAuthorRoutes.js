const express = require("express");
const router = express.Router();
const { getAllbookAuthors, getbookAuthorById, createbookAuthor, updatebookAuthor, deletebookAuthor } = require('../controllers/bookAuthorControllers');


router.get('/', getAllbookAuthors);

router.get('/:id', getbookAuthorById);

router.post('/', createbookAuthor)

router.put('/:id', updatebookAuthor)

router.delete('/:id', deletebookAuthor)

module.exports = router;