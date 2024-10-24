const Section = require('../models/sectionModel.js');

exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.findAll();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.id);
    if (section) {
      res.status(200).json(section);
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSection = async (req, res) => {
  try {
    const newSection = await Section.create(req.body);
    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const [updated] = await Section.update(req.body, {
      where: { section_id: req.params.id },
    });
    if (updated) {
      const updatedSection = await Section.findByPk(req.params.id);
      res.status(200).json(updatedSection);
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const deleted = await Section.destroy({
      where: { section_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};