
const {BibliotecasAulicas} = require('../data/Aulas.js')

const getAulasService = async () => {
    try {
      const Aulas = BibliotecasAulicas;
      return Aulas;
    } catch (error) {
      throw error;
    }
  };

const getAulaConIdService = async (id) =>{
    try {
       const getItem = BibliotecasAulicas.find(Aula => id == Aula.id)
       return getItem
    } catch (error) {
        throw error;
        
    }
}

module.exports = {
    getAulasService,
    getAulaConIdService
}

