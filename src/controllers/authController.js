const userController = require('./usuarioController');

// Ingresar al sistema con username y password
// Se verifica si existe el usuario y si la contraseña es correcta
const login = async (req, res) => {
  const username =req.body.username;
  const password = req.body.password_hash;
  console.log('username', username, 'password', password);

  try {

    const user = await userController.getUserByUsername(username);
    console.log('user', user? user.dataValues : user);
    if(!user) throw new Error('Not found');
    const validatePassword = user.password_hash === password;
    if(!validatePassword) throw new Error('Invalid password');
    res.status(200).send({message: 'Usuario y contraseña correctos', data: user.dataValues})

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
};

module.exports = {
  login,
  register,
};
