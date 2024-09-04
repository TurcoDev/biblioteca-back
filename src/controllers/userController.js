const User = require('../models/userModel.js'); 

// Obtener todos los usuarios
exports.getAllUser= async (req, res) => {
  try {
    const usuarios = await User.findAll(); 
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findByPk(id)
    res.json(user)
} catch (error) {
    res.status(500).json({ error: error.message })
}
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { user_id, username, password_hash, email, role_id } = req.body
    const newUser = await User.create({
        user_id,
        username,
        password_hash,
        email,
        role_id
    })
    res.status(201).json(newUser)
} catch (error) {
    res.status(500).json({ error: error.message })
}
};

// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (user) {
        await User.update(req.body, { where: { user_id: id } })
        res.status(202).json({ message: 'User updated successfully' })
    } else {
        res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete user with ID: ${id}`);
    const result = await User.destroy({
        where: { user_id: id }
    });
    console.log(`Delete result: ${result}`);
    if (result) {
        res.status(204).end();
    } else {
        res.status(404).json({ error: "User not found" });
    }
} catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: error.message });
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



