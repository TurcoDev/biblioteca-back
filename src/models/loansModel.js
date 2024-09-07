const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Book = require('./bookAuthorModel.js'); // Asume que tienes un modelo de Book
const User = require('../models/userModel.js'); // Asume que tienes un modelo de User

const Loan = sequelize.define('Loan', {
  loan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Asocia con el modelo User
      key: 'user_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,  // Asocia con el modelo Book
      key: 'book_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  loan_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  is_late: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Loans',
  timestamps: false, // Si no necesitas createdAt/updatedAt
});

// Definir relaciones con Book y User
Loan.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Loan.belongsTo(Book, { foreignKey: 'book_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Loan;