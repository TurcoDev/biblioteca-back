const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const classroomModel = sequelize.define('classroom_libraries', {
  classroom_library_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false, 
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'Classroom_libraries',
  timestamps: false, 
});

module.exports = classroomModel;

