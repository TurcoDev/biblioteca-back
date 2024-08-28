const {getAulasService, getAulaConIdService} = require('../services/models/aulasModel.js')

const getAulas = async (req, res) => {
    try {
      const Aulas = await getAulasService();
      res.status(200).send({message: 'Aulas', data: Aulas});
    } catch (error) {
      console.error(error);
      res.status(500).send({message: error.message, data: []});
    }
  };

  const getAulaById = async (req, res) => {
    const AulaId = req.params.id;
    try {
      const Aula = await getAulaConIdService(AulaId);
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