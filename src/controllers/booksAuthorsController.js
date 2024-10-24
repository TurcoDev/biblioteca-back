const BooksAuthors = require('../models/bookAuthorModel.js');

exports.getAllBooksAuthors = async (req, res) => {
  try {
    const booksAuthors = await BooksAuthors.findAll();
    res.status(200).json(booksAuthors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksAuthorsById = async (req, res) => {
  try {
    const { book_id, author_id } = req.params;
    const booksAuthors = await BooksAuthors.findOne({ where: { book_id, author_id } });
    if (booksAuthors) {
      res.status(200).json(booksAuthors);
    } else {
      res.status(404).json({ error: "BooksAuthors entry not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBooksAuthors = async (req, res) => {
  try {
    const newBooksAuthors = await BooksAuthors.create(req.body);
    res.status(201).json(newBooksAuthors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBooksAuthors = async (req, res) => {
  try {
    const { book_id, author_id } = req.params;
    const [updated] = await BooksAuthors.update(req.body, {
      where: { book_id, author_id },
    });
    if (updated) {
      const updatedBooksAuthors = await BooksAuthors.findOne({ where: { book_id, author_id } });
      res.status(200).json(updatedBooksAuthors);
    } else {
      res.status(404).json({ error: "BooksAuthors entry not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooksAuthors = async (req, res) => {
  try {
    const { book_id, author_id } = req.params;
    const deleted = await BooksAuthors.destroy({
      where: { book_id, author_id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "BooksAuthors entry not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
