const connection = require('../../config/db.js');

// Crear el modelo de Usuario
const Usuario = {};

// Obtener todos los usuarios
Usuario.getAll = (callback) => {
  const sql = 'SELECT * FROM Usuarios';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

// Obtener un usuario por ID
Usuario.getById = (id, callback) => {
  const sql = 'SELECT * FROM Usuarios WHERE usuario_id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener usuario por ID:', err);
      callback(err, null);
      return;
    }
    callback(null, results[0]);
  });
};

// Crear un nuevo usuario
Usuario.create = (newUsuario, callback) => {
  const sql = 'INSERT INTO Usuarios (nombre_usuario, hash_contraseña, correo, creado_en, actualizado_en, role_id, es_moroso) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [newUsuario.nombre_usuario, newUsuario.hash_contraseña, newUsuario.correo, new Date(), new Date(), newUsuario.role_id, newUsuario.es_moroso];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      callback(err, null);
      return;
    }
    callback(null, result.insertId);
  });
};

// Actualizar un usuario
Usuario.update = (id, updatedUsuario, callback) => {
  const sql = 'UPDATE Usuarios SET nombre_usuario = ?, hash_contraseña = ?, correo = ?, actualizado_en = ?, role_id = ?, es_moroso = ? WHERE usuario_id = ?';
  const values = [updatedUsuario.nombre_usuario, updatedUsuario.hash_contraseña, updatedUsuario.correo, new Date(), updatedUsuario.role_id, updatedUsuario.es_moroso, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      callback(err, null);
      return;
    }
    callback(null, result.affectedRows);
  });
};

// Eliminar un usuario
Usuario.delete = (id, callback) => {
  const sql = 'DELETE FROM Usuarios WHERE usuario_id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      callback(err, null);
      return;
    }
    callback(null, result.affectedRows);
  });
};

module.exports = Usuario;