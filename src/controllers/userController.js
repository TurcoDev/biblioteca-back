const User = require('../models/userModel.js');
const { validateUpdateUser } = require('../services/userServices.js');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err); // Muestra el error en la consola
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // VALIDACIONES
    await validateUpdateUser(req.body, req.params.id);

    /*SI TODO ES CORRECTO, SE ACTUALIZA */
    const [updated] = await User.update(req.body, {
      where: { user_id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);

      res.status(200).json({message: "Usuario actualizado", data: updatedUser.dataValues});
    } else {
      res.status(404).json({ error: "Usuario no encontrado", data: [] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, data: [] });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { user_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};