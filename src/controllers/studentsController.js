const Student = require('../models/studentsModel.js');

// Crear un nuevo estudiante
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los estudiantes
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estudiante por ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ where: { user_id: req.params.id } });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un estudiante
exports.updateStudent = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, { where: { user_id: req.params.id } });
    if (updated) {
      const updatedStudent = await Student.findOne({ where: { user_id: req.params.id } });
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un estudiante
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { user_id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
