const ClassroomLibrary = require('../models/classroomLibraryModel.js');

exports.getAllClassroomLibraries = async (req, res) => {
  try {
    const libraries = await ClassroomLibrary.findAll();
    res.status(200).json(libraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassroomLibraryById = async (req, res) => {
  try {
    const library = await ClassroomLibrary.findByPk(req.params.id);
    if (library) {
      res.status(200).json(library);
    } else {
      res.status(404).json({ error: "Classroom library not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClassroomLibrary = async (req, res) => {
  try {
    const newLibrary = await ClassroomLibrary.create(req.body);
    res.status(201).json(newLibrary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClassroomLibrary = async (req, res) => {
  try {
    const [updated] = await ClassroomLibrary.update(req.body, {
      where: { classroom_library_id: req.params.id },
    });
    if (updated) {
      const updatedLibrary = await ClassroomLibrary.findByPk(req.params.id);
      res.status(200).json(updatedLibrary);
    } else {
      res.status(404).json({ error: "Classroom library not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClassroomLibrary = async (req, res) => {
  try {
    const deleted = await ClassroomLibrary.destroy({
      where: { classroom_library_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Classroom library not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
