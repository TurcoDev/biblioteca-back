const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize-cockroachdb');

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
  tableName: 'authors',
});

module.exports = Author;
