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
  console.log('register');

  // TODO ver como se envia desde el front
  //actualmente el body esperado es asi:
  /* {
    "username": "uhdsuhdu",
    "password_hash": "sdsdasd",
    "email": "dsadas@ussdsdde.com",
    "role_id":"1012621963959762945",
    "is_moroso":false
  } */
  const userData = req.body;
  const password = req.body.password_hash;

  // Encripto la contraseña
  try {
    userData.password_hash = await userService.encryptPassword(password);

    // Modifico el body para que envie el password encriptado
    req.body.password_hash = userData.password_hash;

    await userController.createUser(req, res);

  } catch (error) {
    console.log('error', error);
    res.status(500).send({error: 'Ocurrio un error al encriptar la contraseña', data: []});
  }

};

module.exports = {
  login,
  register,
};
