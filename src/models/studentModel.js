const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js'); 
const Section = require('../models/sectionModel.js'); 
const User = require('./userModel.js');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  section_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Section,
      key: 'section_id',
    },
  },
  member_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'students',
  // primaryKey: ['section_id', 'member_number'],
});

// Relación con User
Student.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Relación con Section
Student.belongsTo(Section, {
  foreignKey: 'section_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Student;