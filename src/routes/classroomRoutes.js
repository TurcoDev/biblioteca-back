const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomContoller.js');


router.get('/', classroomController.getAllClassroom);
router.get('/:id', classroomController.getClassroomById);
router.post('/', classroomController.AddClassroom);
router.put('/:id', classroomController.UpdateClassroom);
router.delete('/:id', classroomController.DeleteClassroom);

module.exports = router;