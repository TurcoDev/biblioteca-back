const userController = require('./usuarioController.js');
const userService = require('../services/userServices.js');
const User = require('../models/userModel.js');

// Ingresar al sistema con username y password
// Se verifica si existe el usuario y si la contraseña es correcta
const login = async (req, res) => {
  const username =req.body.username;
  const password = req.body.password_hash;
  console.log('username', username, 'password', password);

  try {

    const user = await userService.getUserByUsername(username);
    console.log('user', user? user.dataValues : user);
    if(!user) throw new Error('Not found');

    // TODO BORRAR ESTA LINEA SE USA SOLO PARA TEST
    //const validatePassword = user.password_hash === password;

    // Verificacion de contrasena
    const storedPassword = user.password_hash;
    const validatePassword = await userService.validatePassword(password, storedPassword);
    if(!validatePassword) throw new Error('Invalid password');

    res.status(200).send({message: 'Login OK', data: user.dataValues})

  } catch (error) {

    console.log('error', error);
    switch (error.message) {
      case 'Not found':
        res.status(404).send({message: 'Usuario no encontrado', data: []});
        break;
      case 'Invalid password':
        res.status(401).send({message: 'Contraseña incorrecta', data: []});
        break;
      default:
        res.status(500).send({message: 'Ocurrió un error al intentar iniciar sesión', data: []});
        break;
    }

  }
};

const register = async (req, res) => {
  console.log('register');

  // TODO ver como se envia desde el front
  const userData = req.body;
  const password = req.body.password_hash;
  userData.password_hash = await userService.encryptPassword(password);
  console.log('userData', userData);

  // modifico el req.body.user
  //req.body.password_hash = userData.password_hash;

  try {
    //const user = await userController.createUsuario(req, res); // no se como enganchar el createUsuario
    
    // TODO ESTO ES PARA TEST
    const user = await User.create({
      user_id: userData.user_id, // esto sacarlo es por el error que me tira de not null constraint
      username: userData.username,
      password_hash: userData.password_hash,
      email: userData.email,
      role_id: userData.role_id,
      is_moroso: userData.is_moroso || false,
    });

    console.log('user', user);
    res.status(200).send({message: 'Register OK', data: user});
  } catch (error) {
    console.log('error', error);
    res.status(500).send({message: 'Ocurrio un error al intentar registrar', data: []});
  }
};

module.exports = {
  login,
  register,
};
