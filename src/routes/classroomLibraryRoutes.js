const express = require('express');
const router = express.Router();
const classroomLibraryController = require('../controllers/classroomLibraryController');

router.get('/', classroomLibraryController.getAllClassroomLibraries);
router.get('/:id', classroomLibraryController.getClassroomLibraryById);
router.post('/', classroomLibraryController.createClassroomLibrary);
router.put('/:id', classroomLibraryController.updateClassroomLibrary);
router.delete('/:id', classroomLibraryController.deleteClassroomLibrary);

module.exports = router;
