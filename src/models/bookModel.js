const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize-cockroachdb');
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
  portada: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true, // Validar que sea una URL
    },
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
    validate: {
      isIn: [['compra', 'donación']],
    },
  },
}, {
  timestamps: false,
  tableName: 'books',
});

Book.belongsTo(ClassroomLibrary, {
  foreignKey: 'classroom_library_id'
});

module.exports = Book;
