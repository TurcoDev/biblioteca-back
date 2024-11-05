const Book = require('../models/bookModel.js');
const ClassroomLibrary = require('../models/classroomLibraryModel.js');
const fs = require('fs');
const cloudinary = require('../cloudinary/CloudinaryConfig.js');

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
    const result = await cloudinary.uploader.upload(req.file.path);
    const newBook = await Book.create({
      classroom_library_id: req.body.classroom_library_id,
      book_number: req.body.book_number,
      title: req.body.title,
      portada: result.secure_url,
      isbn: req.body.isbn,
      publication_year: req.body.publication_year,
      copy_number: req.body.copy_number,
      origin: req.body.origins
    });
    fs.unlinkSync(req.file.path);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (req.file) {
      if (book.public_id) {
        await cloudinary.uploader.destroy(book.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path);


      req.body.portada = result.secure_url;
      req.body.public_id = result.public_id;

      fs.unlinkSync(req.file.path);
    }

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
    console.error("Error al actualizar el libro:", err);
    res.status(500).json({ error: err.message });
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