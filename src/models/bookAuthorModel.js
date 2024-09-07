const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const BookAuthor = sequelize.define('bookAuthor', {
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
     
  },
  Author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'bookAuthors',
  timestamps: false // Esto indica que no hay campos de timestamps (createdAt, updatedAt).
});