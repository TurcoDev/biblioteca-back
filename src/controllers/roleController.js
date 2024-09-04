const Role = require('../models/Role');

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un rol por ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo rol
const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    if (!role_name) {
      return res.status(400).json({ message: 'Role name is required' });
    }
    const newRole = await Role.create({ role_name });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un rol existente
const updateRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    const [updated] = await Role.update({ role_name }, {
      where: { role_id: req.params.id }
    });
    if (updated) {
      const updatedRole = await Role.findByPk(req.params.id);
      res.json(updatedRole);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.destroy({
      where: { role_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
