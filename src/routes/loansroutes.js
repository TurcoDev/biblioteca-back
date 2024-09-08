const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');

// Rutas de sections
router.get('/', loansController.getAllSections);
router.get('/:id', loansController.getSectionById);
router.post('/', loansController.createSection);
router.put('/:id', loansController.updateSection);
router.delete('/:id', loansController.deleteSection);

module.exports = router;
