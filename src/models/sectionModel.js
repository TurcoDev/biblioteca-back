const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Teacher = require('../models/teacherModel.js');
const ClassroomLibrary = require('../models/classroomLibraryModel.js');

const Section = sequelize.define('Section', {
  section_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shift: {
    type: DataTypes.STRING(10), // Por ejemplo: "Mañana", "Tarde"
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(10), // Ejemplo: "1A", "1B", "2B", "3"
    allowNull: false
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Teacher,
      key: 'teacher_id'
    }
  },
  classroom_library_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ClassroomLibrary,
      key: 'classroom_library_id'
    }
  }
}, {
  tableName: 'Sections',
  timestamps: false
});

Section.belongsTo(Teacher, { foreignKey: 'teacher_id' });
Section.belongsTo(ClassroomLibrary, { foreignKey: 'classroom_library_id' });

module.exports = Section;
