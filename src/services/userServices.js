const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const SALT = 10;

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


// Recibe una contraseña y la encripta
exports.encryptPassword = async(password) => {
  return await bcrypt.hash(password, SALT);
}


// Verifica si la contraseña es correcta
exports.validatePassword = async(userPassword, storedPassword) => {
  return await bcrypt.compare(userPassword, storedPassword);
}