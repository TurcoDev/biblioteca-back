// src/models/Author.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Author = sequelize.define('Author', {
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false, // No autoIncrement, debe ser proporcionado manualmente
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'Authors',
  timestamps: false, // Esto indica que no hay campos de timestamps (createdAt, updatedAt).
});

module.exports = Author;
