const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/userController');

// Rutas de usuarios
router.get('/', usuariosController.getAllUser);
router.get('/:id', usuariosController.getUserById);
router.post('/', usuariosController.createUser);
router.put('/:id', usuariosController.updateUser);
router.delete('/:id', usuariosController.deleteUser);

module.exports = router;