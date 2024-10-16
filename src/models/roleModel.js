const sequelize = require('../config/db.js');
const { DataTypes } = require('sequelize-cockroachdb');

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'roles',
});

module.exports = Role;