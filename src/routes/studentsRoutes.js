const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController.js');

// Obtener todos los estudiantes
router.get('/', getAllStudents);

// Crear un nuevo estudiante
router.post('/', createStudent);

// Obtener un estudiante por ID
router.get('/:id', getStudentById);

// Actualizar un estudiante
router.put('/:id', updateStudent);

// Eliminar un estudiante
router.delete('/:id', deleteStudent);

module.exports = router;
