const Usuario = require('../services/models/usuarioModel.js');

// Obtener todos los usuarios
exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, usuarios) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(usuarios);
  });
};

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  Usuario.getById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  });
};

// Crear un nuevo usuario
exports.createUsuario = (req, res) => {
  const nuevoUsuario = {
    nombre_usuario: req.body.nombre_usuario,
    hash_contraseña: req.body.hash_contraseña,
    correo: req.body.correo,
    role_id: req.body.role_id,
    es_moroso: req.body.es_moroso || false
  };

  Usuario.create(nuevoUsuario, (err, usuarioId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
    res.status(201).json({ usuario_id: usuarioId });
  });
};

// Actualizar un usuario existente
exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  const updatedUsuario = {
    nombre_usuario: req.body.nombre_usuario,
    hash_contraseña: req.body.hash_contraseña,
    correo: req.body.correo,
    role_id: req.body.role_id,
    es_moroso: req.body.es_moroso
  };

  Usuario.update(id, updatedUsuario, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  });
};

// Eliminar un usuario
exports.deleteUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.delete(id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  });
};