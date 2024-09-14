// Iniciamos una instancia de Sequelize y la conexión a la base de datos
const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js');
const Author = require('./authorsModel.js');
const ClassroomLibrary = require('./classroomLibraryModel.js');

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  classroom_library_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClassroomLibrary,
      key: 'classroom_library_id',
    },
  },
  book_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING(17),
    allowNull: true,
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  copy_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'Books',
});

Book.belongsTo(ClassroomLibrary, {
  foreignKey: 'classroom_library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Book;