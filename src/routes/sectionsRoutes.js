const express = require('express');
const router = express.Router();
const sectionsController = require('../controllers/sectionsController');

// Rutas de sections
router.get('/', sectionsController.getAllSections);
router.get('/:id', sectionsController.getSectionById);
router.post('/', sectionsController.createSection);
router.put('/:id', sectionsController.updateSection);
router.delete('/:id', sectionsController.deleteSection);

module.exports = router;
