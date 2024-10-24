const Book = require('../models/bookModel.js');
const ClassroomLibrary = require('../models/classroomLibraryModel.js');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { book_id: req.params.id },
    });
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { book_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};