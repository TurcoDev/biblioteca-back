const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roleController');

// Obtener todos los roles
router.get('/', rolesController.getAllRoles);

// Crear un nuevo rol
router.post('/', rolesController.createRole);

// Obtener un rol por ID
router.get('/:id', rolesController.getRoleById);

// Actualizar un rol
router.put('/:id', rolesController.updateRole);

// Eliminar un rol
router.delete('/:id', rolesController.deleteRole);

module.exports = router;
