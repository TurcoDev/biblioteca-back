const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Loan = sequelize.define('Loan', {
  loan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

module.exports = Loan;
