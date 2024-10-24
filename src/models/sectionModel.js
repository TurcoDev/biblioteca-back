const { DataTypes } = require('sequelize-cockroachdb');
const sequelize = require('../config/db.js'); 
const User = require('./userModel.js');
const ClassroomLibrary = require('./classroomLibraryModel.js');

const Section = sequelize.define('Section', {
  section_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shift: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  classroom_library_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClassroomLibrary,
      key: 'classroom_library_id',
    },
  },
}, {
  timestamps: false,
  tableName: 'sections',
});

// Relación con Teacher (User)
Section.belongsTo(User, {
  foreignKey: 'teacher_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Relación con ClassroomLibrary
Section.belongsTo(ClassroomLibrary, {
  foreignKey: 'classroom_library_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Section;