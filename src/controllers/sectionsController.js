const Section = require('../models/sectionsModel.js');

// Obtener todas las secciones
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.findAll(); 
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener secciones' });
  }
};

// Obtener una sección por ID
exports.getSectionById = async (req, res) => {
  const id = req.params.id;
  try {
    const section = await Section.findByPk(id); 
    if (!section) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }
    res.json(section);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener sección' });
  }
};

// Crear una nueva sección
exports.createSection = async (req, res) => {
  const { year, shift, name, teacher_id, classroom_library_id } = req.body;

  try {
    const newSection = await Section.create({
      year,
      shift,
      name,
      teacher_id,
      classroom_library_id,
    });
    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear sección' });
  }
};

// Actualizar una sección existente
exports.updateSection = async (req, res) => {
  const id = req.params.id;
  const { year, shift, name, teacher_id, classroom_library_id } = req.body;

  try {
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }

    section.year = year;
    section.shift = shift;
    section.name = name;
    section.teacher_id = teacher_id;
    section.classroom_library_id = classroom_library_id;

    await section.save(); 
    res.status(200).json({ message: 'Sección actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar sección' });
  }
};

// Eliminar una sección
exports.deleteSection = async (req, res) => {
  const id = req.params.id;
  try {
    const affectedRows = await Section.destroy({ where: { section_id: id } });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Sección no encontrada' });
    }

    res.status(200).json({ message: 'Sección eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar sección' });
  }
};
