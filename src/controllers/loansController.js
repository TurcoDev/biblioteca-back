const Loan = require('../models/loansModell.js');

// Crear un préstamo
exports.createLoan = async (req, res) => {
  try {
    const { user_id, book_id, loan_date, due_date } = req.body;
    const newLoan = await Loan.create({ user_id, book_id, loan_date, due_date });
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el préstamo.' });
  }
};

// Obtener todos los préstamos
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los préstamos.' });
  }
};

// Obtener un préstamo por ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Préstamo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el préstamo.' });
  }
};

// Actualizar un préstamo
exports.updateLoan = async (req, res) => {
  try {
    const { return_date, is_late } = req.body;
    const loan = await Loan.findByPk(req.params.id);

    if (loan) {
      await loan.update({ return_date, is_late });
      res.status(200).json(loan);
    } else {
      res.status(404).json({ message: 'Préstamo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el préstamo.' });
  }
};

// Eliminar un préstamo
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      await loan.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Préstamo no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el préstamo.' });
  }
};
