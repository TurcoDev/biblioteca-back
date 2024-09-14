const Loan = require('../models/loansModel.js');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los préstamos' });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (loan) {
      res.status(200).json(loan);
    } else {
      res.status(404).json({ error: "Loan not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const newLoan = await Loan.create(req.body);
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const [updated] = await Loan.update(req.body, {
      where: { loan_id: req.params.id },
    });
    if (updated) {
      const updatedLoan = await Loan.findByPk(req.params.id);
      res.status(200).json(updatedLoan);
    } else {
      res.status(404).json({ error: "Loan not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const deleted = await Loan.destroy({
      where: { loan_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Loan not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};