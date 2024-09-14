const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController.js');

router.get('/', studentController.getAllStudents);
router.get('/:user_id', studentController.getStudentById);
router.post('/', studentController.createStudent);
router.put('/:user_id', studentController.updateStudent);
router.delete('/:user_id', studentController.deleteStudent);

module.exports = router;