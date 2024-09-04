const User = require('../models/userModel.js'); 

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll(); 
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await User.findByPk(id); 
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  const { username, password_hash, email, role_id, is_moroso } = req.body;

  try {
    const nuevoUsuario = await User.create({
      username,
      password_hash,
      email,
      role_id,
      is_moroso: is_moroso || false,
    }); 
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
  const id = req.params.id;
  const { username, password_hash, email, role_id, is_moroso } = req.body;

  try {
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuario.username = username;
    usuario.password_hash = password_hash;
    usuario.email = email;
    usuario.role_id = role_id;
    usuario.is_moroso = is_moroso;

    await usuario.save(); 
    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const affectedRows = await User.destroy({ where: { user_id: id } });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};


// TODO cambiarlo por email en caso de que el usuario se loguee con el email
// Verifica si un username existe o no en la db
const usernameExists = async(username) => {
  const user = await User.findOne({ where: { username: username } });
  return user; // si no existe, retorna null, si existe retorna el user con ese username
}


// Obtiene un usuario por username
exports.getUserByUsername = async(username) => {
  const user = await usernameExists(username);
  //console.log('user', user);
  return user ? user : null;
}



