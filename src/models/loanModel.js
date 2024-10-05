const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js');
const Book = require('./bookModel.js'); // Asume que tienes un modelo de Book
const User = require('./userModel.js'); // Asume que tienes un modelo de User

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
      model: User,
      key: 'user_id',
    },
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'book_id',
    },
  },
  loan_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_late: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: false,
  tableName: 'loans',
});

// Relación con User
Loan.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Relación con Book
Loan.belongsTo(Book, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Loan;