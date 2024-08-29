const Classroom = require('../models/classroomModel.js')

const getAulas = async (req, res) => {
    try {
      const Aulas = await Classroom.findAll();
      res.status(200).send({message: 'Aulas', data: Aulas});
    } catch (error) {
      console.error(error);
      res.status(500).send({message: error.message, data: []});
    }
  };

  const getAulaById = async (req, res) => {
    const AulaId = req.params.id;
    try {
      const Aula = await Classroom.findByPk(AulaId);
      if(!Aula){res.status(404).send("Aula no encontrada")}
      res.status(200).send({message: 'Aula', data: Aula}) 
    } catch (error) {
      console.error(error);
      res.status(500).send({message: error.message, data: []});
    }
  
  };

  module.exports = {
    getAulaById,
    getAulas
  }