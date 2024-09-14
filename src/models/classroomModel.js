const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Classroom = sequelize.define('Classroom', {
  classroom_library_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'Classroom_libraries',
  timestamps: false, 
});

module.exports = Classroom;