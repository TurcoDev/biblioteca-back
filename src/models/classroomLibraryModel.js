const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js');

const ClassroomLibrary = sequelize.define('ClassroomLibrary', {
    classroom_library_id: {
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
    tableName: 'classroom_libraries',
  });
  
  module.exports = ClassroomLibrary;  