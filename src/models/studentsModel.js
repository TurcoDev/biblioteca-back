const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); 
const Section = require('../models/sectionsModel.js'); // Importa el modelo Section
const User = require('../models/userModel.js'); // Importa el modelo User

const Student = sequelize.define('Student', {
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  section_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Section,
      key: 'section_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  member_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'Students',
  timestamps: false,
  primaryKey: ['section_id', 'member_number']
});

// Definir las relaciones
Student.belongsTo(Section, { foreignKey: 'section_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Student;
