const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');

// Rutas de Loans
router.get('/', loansController.getAllLoans);
router.get('/:id', loansController.getLoanById);
router.post('/', loansController.createLoan);
router.put('/:id', loansController.updateLoan);
router.delete('/:id', loansController.deleteLoan);

module.exports = router;
