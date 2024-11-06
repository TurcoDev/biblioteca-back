const Author = require('../models/authorsModel.js');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const [updated] = await Author.update(req.body, {
      where: { author_id: req.params.id },
    });
    if (updated) {
      const updatedAuthor = await Author.findByPk(req.params.id);
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.destroy({
      where: { author_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};