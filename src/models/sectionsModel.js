const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); 
const Classroom = require('./classroomModel.js')
// Si tienes modelos para Teacher o ClassroomLibrary, deberías importarlos aquí
// const Teacher = require('../models/teacherModel.js');
// const ClassroomLibrary = require('../models/classroomLibraryModel.js');

const Section = sequelize.define('Section', {
  section_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shift: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    references: {
      // Cambia 'Teacher' por el nombre correcto de tu modelo de profesor
      model: 'Teacher', 
      key: 'teacher_id'
    }
  },
  classroom_library_id: {
    type: DataTypes.INTEGER,
    references: {
      // Cambia 'ClassroomLibrary' por el nombre correcto de tu modelo de biblioteca de aula
      model: 'ClassroomLibrary',
      key: 'classroom_library_id'
    }
  }
}, {
  tableName: 'Sections',
  timestamps: false
});

// Si tienes relaciones, puedes definirlas aquí, por ejemplo:
// Section.belongsTo(Teacher, { foreignKey: 'teacher_id' });
 Section.belongsTo(Classroom, { foreignKey: 'classroom_library_id' });

module.exports = Section;
