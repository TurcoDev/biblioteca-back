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

  const AddAula = async (req, res)=>{
    const Data = req.body
    try {
      const NewAula = Classroom.create(Data)
      res.status(201).send("Aula Creada")
      console.log(NewAula);
    } catch (error) {
      res.status(500).send(error)
    }
  }

  const UpdateAula = async (req, res)=>{
    const id = req.params.id
    const name = req.body
    try {
      const aula = await Classroom.findByPk(id);
      if(!aula){
        res.status(404).send("Aula no encontrada")
      }else{
        Classroom.name = name
        await Classroom.save()
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }

  const DeleteAula = async (req, res)=>{
    const id = req.params.id
    try {
      const Delete = await Classroom.destroy({ where: { classroom_library_id: id } });
      if (Delete === 0) {
        return res.status(404).send("Aula no encontrada");
      }
      res.status(200).send("Aula eliminada correctamente");
    } catch (error) {
      res.status(500).send(error)
    }
  }

  module.exports = {
    getAulaById,
    getAulas,
    AddAula,
    UpdateAula,
    DeleteAula
  }