const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.js');

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Agregado si deseas autoincrementar los IDs.
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  }
}, {
  tableName: 'Roles',
  timestamps: false // Esto indica que no hay campos de timestamps (createdAt, updatedAt).
});

module.exports = Role;
