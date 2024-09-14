const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js');
const Book = require('./bookModel.js');
const Author = require('./authorsModel.js');

const BookAuthor = sequelize.define('BookAuthor', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Book,
      key: 'book_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Author,
      key: 'author_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: false,
  tableName: 'Books_Authors',
});

Book.belongsToMany(Author, { through: BookAuthor, foreignKey: 'book_id' });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: 'author_id' });

module.exports = BookAuthor;