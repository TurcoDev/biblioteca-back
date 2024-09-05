//const {getBooksService, getBookByIdService, createBookService, updateBookService, deleteBookService} = require('../services/models/bookModel');
// Iniciamos una instancia de Sequelize y la conexión a la base de datos
/* const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js'); */
// Importamos el modelo
const Book = require('../models/bookModel.js');

// Obtener todos los libros
const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    //console.log('books', books);
    books.length === 0 ? res.status(200).send({message: 'No se encontraron libros guardados', data: []}) :
    res.status(200).send({message: 'Libros encontrados', data: books});
  } catch (error) {
    console.error(error);
    res.status(500).send({error: error.message, data: []});
  };
};


// Obtener un libro por ID, método utilizado por getBookById, updateBookById y deleteBookById
const getBookByIdService = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);

    if(book === null) {
      throw new Error('Not found');
    };
    
    return book;
  } catch (error) {
    throw error;
  };
};


// Obtener un libro por ID
const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await getBookByIdService(bookId);
    res.status(200).send({message: 'Libro encontrado', data: book});
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({error: `Libro id ${bookId} no encontrado`, data: []});
    } else {
      res.status(500).send({error: error.message, data: []});
    }
  };

};


// Inserta un nuevo libro en la db
const createBook = async (req, res) => {
  const bookData = req.body;
  try {
    //let book = await Book.sync({force: false}) // crea la tabla y si ya existe la actualiza, no la vuelve a crear
    const book = await Book.create(bookData) // inserta los datos que vienen en bookData
    
    res.status(201).send({message: 'Libro creado', data:book});
  } catch (error) {
    console.log(error);
    res.status(500).send({error: error.message, data: []});
  };
};


// Actualiza el libro que se le pasa por ID en la db
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const bookData = req.body;
  console.log('bookData', bookData);
  try {
    // Lo primero es comprobar que el libro existe, si no existe se lanza un error
    const bookToUpdate = await getBookByIdService(bookId);
    // Si el libro existe, se actualiza de acuerdo a bookData
    const updatedBook = await Book.update(bookData, {where: {book_id: bookId}});
    
    if(updatedBook !==0){ // Si devuelve 0 es porque no se ha actualizado
      res.status(200).send({message: `Libro ${bookId} actualizado`, data: updatedBook});
    } else {
      throw new Error('Not updated');
    };
    
  } catch (error) {
    console.log(error);
    // De acuerdo al error, se especifica el status code y el mensaje del error
    switch (error.message) {
      case 'Not found':
      res.status(404).send({error: `Libro id: ${bookId} no encontrado`, data: []});
      break;
      case 'Not updated':
      res.status(500).send({error: `Error, libro id: ${bookId} no actualizado`, data: []});
      break;
      default:
      res.status(500).send({error: error.message, data: []});
      break;
    };
  };
};



const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const bookToDelete = await getBookByIdService(bookId);

    const deletedBook = await Book.destroy({where:{book_id:bookId}});
    console.log(deletedBook);
    if(deletedBook !==0){ // Si devuelve 0 es porque no se ha eliminado
      res.status(200).send({message: `Libro ${bookId} eliminado`, data: bookId});
    } else {
      throw new Error('Not deleted');
    };
    
  } catch (error) {
    console.log(error);
    // De acuerdo al error, se especifica el status code y el mensaje del error
    switch (error.message) {
      case 'Not found':
      res.status(404).send({error: `Libro id ${bookId} no se ha encontrado`, data: []});
      break;
      case 'Not deleted':
      res.status(500).send({error: `Error, libro id ${bookId} no se ha eliminado`, data: []});
      break;
      default:
      res.status(500).send({error: error.message, data: []});
      break;
    }
  };
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};