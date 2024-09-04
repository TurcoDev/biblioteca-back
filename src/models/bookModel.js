// Iniciamos una instancia de Sequelize y la conexión a la base de datos
const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js');


// Esquema de la tabla libros de la base de datos
// TODO falta definir bien cada campo y validaciones
const Book = sequelize.define('Book', {
    book_id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    /* classroom_library_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Classroom,
          key: 'classroom_library_id'
        }
    }, */
    classroom_library_id:{
        type:Sequelize.DataTypes.INTEGER,
    },
    book_number:{
        type:Sequelize.DataTypes.INTEGER,
    },
    title:{
        type:Sequelize.DataTypes.STRING,
        //allowNull: false,
    },
    isbn:{
        type:Sequelize.DataTypes.STRING(17),
        allowNull: false,
        unique: true
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
        type:Sequelize.DataTypes.STRING,
        //allowNull:false
    },
}, {
  tableName: 'Books'
});

//Book.belongsTo(Classroom, { foreignKey: 'classroom_library_id' });

module.exports = Book;