//const {getBooksService, getBookByIdService, createBookService, updateBookService, deleteBookService} = require('../services/models/bookModel');
// Iniciamos una instancia de Sequelize y la conexión a la base de datos
/* const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js'); */
// Importamos el modelo
const Book = require('../models/bookModel.js');


const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    
    //console.log('books', books)
    
    res.status(200).send({message: 'Books', data: books});
  } catch (error) {
    console.error(error);
    res.status(500).send({message: error.message, data: []});
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); 
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener books' });
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await getBookByIdService(bookId);
    //console.log('book', book)
    
    res.status(200).send({message: 'Book', data: book});
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({message: `Libro id: ${bookId} no encontrado`, data: []});
    } else {
      res.status(500).send({message: error.message, data: []});
    }
  }

};

const createBook = async (req, res) => {
  const bookData = req.body;
  try {
    //const book = await createBookService(bookData);
    //let book = await Book.sync({force: false}) // crea la tabla y si ya existe la actualiza, no la vuelve a crear
    const book = await Book.create(bookData) // inserta los datos que vienen en bookData
    
    res.status(201).send({message: 'Book created', data:book});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message, data: []});
  }

};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;
  try {
    const updatedBook = await updateBookService(bookId, bookData);
    //console.log('updatedBook', updatedBook);

      res.status(200).send({message: `Libro ${bookId} actualizado`, data: updatedBook});
    
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({message: `Libro id: ${bookId} no encontrado`, data: []});
    } else {
      res.status(500).send({message: error.message, data: []});
    }
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const bookDeleted = await deleteBookService(bookId);
    //console.log(bookDeleted)
    
    res.status(200).send({message: `Libro ${bookId} eliminado`, data: bookId});
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({message: `Libro id: ${bookId} no encontrado`, data: []});
    } else {
      res.status(500).send({message: error.message, data: []});
    }
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};