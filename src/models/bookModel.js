// Iniciamos una instancia de Sequelize y la conexión a la base de datos
const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js');


// Esquema de la tabla libros de la base de datos
// TODO falta definir bien cada campo
const Book = sequelize.define('Book', {
    book_id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    classroom_library_id:{
        type:Sequelize.DataTypes.INTEGER,
    },
    book_number:{
        type:Sequelize.DataTypes.INTEGER,
    },
    title:{
        type:Sequelize.DataTypes.STRING(255),
        //allowNull: false,
    },
    isbn:{
        type:Sequelize.DataTypes.STRING(17),
        allowNull: false,
        //unique: true
    },
    publication_year:{
        type:Sequelize.DataTypes.INTEGER,
        //allowNull:false
    },
    copy_number:{
        type:Sequelize.DataTypes.INTEGER,
        //allowNull:false
    },
    origin:{
        type:Sequelize.DataTypes.STRING(255),
        //allowNull:false
    },
}, {
  tableName: 'Books'
})

module.exports = Book;

const getBooksService = async () => {
  try {
    //const books = await books.findAll();
    /* const books = librosTest; */
    const books = Book.findAll(); // conecta con la db y trae todos los books

    return books;
  } catch (error) {
    throw error;
  }
};

const getBookByIdService = async (bookId) => {
  try {
    const book = librosTest.filter(libro => libro.libro_id == bookId);

    if(book.length == 0) {
      throw new Error('Not found');
    };
    
    return book;
  } catch (error) {
    throw error;
  }
};

const createBookService = async (bookData) => {
  try {
    /* const libroId = librosTest.length + 1;
    bookData.libro_id = libroId;
    librosTest.push(bookData);
    console.log('librosTest', librosTest); */
    let book = await Book.sync({force: false}) // crea la tabla y si ya existe la actualiza, no la vuelve a crear
    book = await Book.create(bookData) // inserta los datos que vienen en bookData
    
    return book;
  } catch (error) {
    throw error;
  }
};

const updateBookService = async (bookId, bookDataToUpdate) => {
  try {
    const index = librosTest.findIndex(libro => libro.libro_id == bookId);
    if(index == -1) {
      throw new Error('Not found');
    }
    librosTest[index] = bookDataToUpdate;
    
    return librosTest;
  } catch (error) {
    throw error;
  }
};

const deleteBookService = async (bookId) => {
  try {
    const index = librosTest.findIndex(libro => libro.libro_id == bookId);
    if(index == -1) {
      throw new Error('Not found');
    };

    const book = librosTest.splice(index, 1);
    
    return librosTest;
  } catch (error) {
    throw error;
  }
};

/* module.exports = {
  getBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService
} */