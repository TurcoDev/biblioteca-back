const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const SALT = 10;

// Verifica si un username existe o no en la db
const usernameExists = async(username) => {
  const user = await User.findOne({ where: { username: username } });
  return user; // si no existe, retorna null, si existe retorna el user con ese username
}

// Verifica si un email existe o no en la db
const emailExists = async(email) => {
  const user = await User.findOne({ where: { email: email } });
  return user; // si no existe, retorna null, si existe retorna el user con ese email
}


// Obtiene un usuario por username
exports.getUserByUsername = async(username) => {
  const user = await usernameExists(username);
  //console.log('user', user);
  return user ? user : null;
}

// Obtiene un usuario por email
exports.getUserByEmail = async(email) => {
  const user = await emailExists(email);
  return user ? user : null;
}


// Recibe una contraseña y la encripta
exports.encryptPassword = async(password) => {
  console.log('password', password);
  console.log('SALT', SALT);
  return await bcrypt.hash(password, SALT);
}


// Verifica si la contraseña es correcta
exports.validatePassword = async(userPassword, storedPassword) => {
  return await bcrypt.compare(userPassword, storedPassword);
}