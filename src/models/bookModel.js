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