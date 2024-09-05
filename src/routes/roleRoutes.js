const express = require('express');
const router = express.Router();
const { getRoles, createRole, getRoleById, updateRole, deleteRole } = require('../controllers/rolesController');

// Obtener todos los roles
router.get('/', getRoles);

// Crear un nuevo rol
router.post('/', createRole);

// Obtener un rol por ID
router.get('/:id', getRoleById);

// Actualizar un rol
router.put('/:id', updateRole);

// Eliminar un rol
router.delete('/:id', deleteRole);

module.exports = router;
