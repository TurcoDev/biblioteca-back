const BookAuthor = require('../models/bookAuthorModel.js');


// Obtener todos los bookAuthors
const getAllbookAuthors = async (req, res) => {
  try {
    const bookAuthor = await BookAuthor.findAll();
    res.json(bookAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getbookAuthorById = async (req, res) => {
    const bookAuthor_Id = req.params.id;
    try {
      const bookAuthor = await BookAuthor.findByPk(bookAuthor_Id);
      if (!bookAuthor) {
        return res.status(404).json({ error: "bookAuthor no encontrado "});
      }
      res.json(bookAuthor);
      res.status(200).send({message: 'bookAuthor', data: bookAuthor}) 
    } catch (error) {
      console.error(error);
      res.status(500).send({message: error.message, data: []});
    }
  
  };


// Crear un nuevo rol
const createbookAuthor = async (req, res) => {
  try {
    const { Book_id,Author_id } = req.body;
    
    const newbookAuthor = await BookAuthor.create({ Book_id,Author_id });
    res.status(201).json(newbookAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un bookAuthor existente
const updatebookAuthor = async (req, res) => {
  try {
    const { Book_id,Author_id  } = req.body;
    const [updated] = await BookAuthor.update({ Book_id,Author_id }, {
      where: { BookAuthor_id: req.params.id }
    });
    if (updated) {
      const updatedbookAuthor = await BookAuthor.findByPk(req.params.id);
      res.json(updatedbookAuthor);
    } else {
      res.status(404).json({ message: 'bookAuthor_id not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un bookAuthor
const deletebookAuthor = async (req, res) => {
  try {
    const deleted = await BookAuthor.destroy({
      where: { BookAuthor_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'bookAuthor_id not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllbookAuthors,
  getbookAuthorById,
  createbookAuthor,
  updatebookAuthor,
  deletebookAuthor,
};