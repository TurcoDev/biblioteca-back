const ClassroomModel = require('../models/aulasModel.js')

const getAulas = async (req, res) => {
    try {
      const Aulas = await ClassroomModel.findAll();
      res.status(200).json(Aulas);
    } catch (error) {
      console.error(error);
      res.status(500).send({message: error.message, data: []});
    }
  };

  const getAulaById = async (req, res) => {
    const AulaId = req.params.id;
    try {
      const Aula = await ClassroomModel.findByPk();
      if (!Aula) {
        return res.status(404).json({ error: "Aula no encontrado "});
      }
      res.json(Aula);
      res.status(200).send({message: 'Aula', data: Aula}) 
    } catch (error) {
      console.error(error);
      res.status(500).send({message: error.message, data: []});
    }
  
  };

  const AddAula = async (req, res)=>{
    const {name} = req.body
    try {
      const Aula = await ClassroomModel.create({
        name
      })
      res.status(201).json(Aula);
    } catch (error) {
      res.status(500).send({message: error.message, data: []});
    }
  }

  const UpdateAula = async (req, res)=>{
    const id = req.params.id
    const {name} = req.body
    try {
      const Aula = ClassroomModel.findByPk(id)
      if (!Aula) {
        return res.status(404).json({ error: 'Aula no encontrada' });
      }
      Aula.name = name
      await Aula.save()
      res.status(200).json({ message: 'Aula actualizada correctamente' });
    } catch (error) {
      res.status(500).send({message: error.message, data: []});
    }
  }

  const DeleteAula = async (req, res)=>{
    const id = req.params.id
    try {
      const DeleteAula = await ClassroomModel.destroy({ where: { classroom_library_id: id } });

    if (DeleteAula === 0) {
      return res.status(404).json({ error: 'Aula no encontrada' });
    }

    res.status(200).json({ message: 'Aula eliminada correctamente' });
    } catch (error) {
      
    }
  }

  module.exports = {
    getAulaById,
    getAulas,
    AddAula,
    UpdateAula,
    DeleteAula
  }