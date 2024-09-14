// src/models/Author.js
const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize-cockroachdb');
const Book = require('./bookModel.js');

const Author = sequelize.define('Author', {
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Authors',
});

module.exports = Author;