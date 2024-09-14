const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js');
const Role = require('../models/roleModel.js');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  role_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Role,
      key: 'role_id',
    },
  },
  is_late: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: false,
  tableName: 'Users',
});

// Relación con Role
User.belongsTo(Role, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = User;