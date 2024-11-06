const User = require('../models/userModel.js');
const Role = require('../models/roleModel.js');
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

// Obtiene un usuario por id
const getUserById = async(id) => {
  const user = await User.findByPk(id);
  return user ? user : null; // si no existe, retorna null, si existe retorna el user con ese id
}


// Obtiene un usuario por username
const getUserByUsername = async(username) => {
  const user = await usernameExists(username);
  return user ? user : null;
}

// Obtiene un usuario por email
const getUserByEmail = async(email) => {
  const user = await emailExists(email);
  return user ? user : null;
}


// Recibe una contraseña y la encripta
const encryptPassword = async(password) => {
  return await bcrypt.hash(password, SALT);
}


// Verifica si la contraseña es correcta
const validatePassword = async(userPassword, storedPassword) => {
  return await bcrypt.compare(userPassword, storedPassword);
}


// Obtengo un rol por nombre
const getRoleByName = async(name) => {
  const role = await Role.findOne({ where: { role_name: name } });
  return role ? role.role_id : null;
}

// Valida la actualizacion de un usuario (username, email y password)
const validateUpdateUser = async(user, id) => {
  // Obtengo el user por id
  const storedUser = await getUserById(id);

  /*VALIDACIONES*/
  try {
    try {
      // CONTRASEÑA
      if(user.hasOwnProperty("password_hash")){
        // Verificamos si la contraseña es la misma que la almacenada
        const matchPassword = await validatePassword(user.password_hash, storedUser.password_hash);
        // si no coincide es porque hay que actualizarla
        if(!matchPassword) {
          // Si el campo a actualizar es la contraseña, se encripta antes de hacer el update
          user.password_hash = await encryptPassword(user.password_hash);
        } else { // si coincide con la almacenada, se elimina para que no se actualice
          delete user.password_hash;
        }
      }
    } catch (error) {
      throw new Error("Error al encriptar la contraseña");
    };
    // NOMBRE DE USUARIO
    if(user.hasOwnProperty("username")){
      // Verificamos si el username es el mismo que el almacenado, si es diferente hay que actualizarlo
      if(user.username !== storedUser.username) {
        // Si el campo a actualizar es el username, se verifica que no exista
        const usernameExists = await usernameExists(user.username);
        if(usernameExists){ // si existe, lanza un error
          throw new Error("El nombre de usuario ya existe");
        };
      };
    };
    // EMAIL
    if(user.hasOwnProperty("email")){
      // Verificamos si el email es el mismo que el almacenado, si es diferente hay que actualizarlo
      if(!user.email === storedUser.email) {
        // Si el campo a actualizar es el email, se verifica que no exista
        const emailExists = await emailExists(user.email);
        if(emailExists){ // si existe, lanza un error
          throw new Error("El email ya existe");
        };
      };
    };
  
  } catch (error) {
    throw new Error(error.message);
  };
};

module.exports = {
  usernameExists,
  emailExists,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  encryptPassword,
  validatePassword,
  getRoleByName,
  validateUpdateUser
};