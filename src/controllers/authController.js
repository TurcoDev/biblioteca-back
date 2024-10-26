const userController = require('./userController.js');
const userService = require('../services/userServices.js');
const User = require('../models/userModel.js');

// Ingresar al sistema con username y password
// Se verifica si existe el usuario y si la contraseña es correcta
const login = async (req, res) => {
  const username =req.body.username;
  const password = req.body.password_hash;

  try {

    const user = await userService.getUserByUsername(username);
    if(!user) throw new Error('Not found');

    // Verificacion de contrasena
    const storedPassword = user.password_hash;
    const validatePassword = await userService.validatePassword(password, storedPassword);
    if(!validatePassword) throw new Error('Invalid password');

    res.status(200).send({message: 'Login OK', data: user.dataValues})

  } catch (error) {

    console.log('error', error);
    switch (error.message) {
      case 'Not found':
        res.status(404).send({error: 'Usuario no encontrado', data: []});
        break;
      case 'Invalid password':
        res.status(401).send({error: 'Validacion incorrecta', data: []});
        break;
      default:
        res.status(500).send({error: 'Ocurrió un error al intentar iniciar sesión', data: []});
        break;
    }

  }
};

const register = async (req, res) => {
  const userData = req.body;
  const password = req.body.password_hash;

  try {
    // Encripto la contraseña
    userData.password_hash = await userService.encryptPassword(password);

    // Modifico el body para que envie el password encriptado
    req.body.password_hash = userData.password_hash;

    // verifico si el username y el email no existen
    const usernameExists = await userService.getUserByUsername(userData.username);
    if(usernameExists) throw new Error('Username already exists');
    const emailExists = await userService.getUserByEmail(userData.email);
    if(emailExists) throw new Error('Email already exists');

    // Si no existen, se crea el usuario
    await userController.createUser(req, res);

  } catch (error) {
    console.log('error', error);
    switch (error.message) {
      case 'Username already exists':
        res.status(500).send({error: 'Ya existe un usuario con ese username', data: []});
        break;
      case 'Email already exists':
        res.status(500).send({error: 'Ya existe un usuario con ese email', data: []});
        break;
      default:
        res.status(500).send({error: 'Ocurrió un error al intentar registar usuario', data: []});
        break;
    }

  }

};

module.exports = {
  login,
  register,
};
