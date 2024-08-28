// TODO esto se cambia cuando se haga el modelo real con sequelize
/* const LibroSchema = {
  libro_id: '',
  biblio_aulica_id: '',
  nro_libro_id: '',
  título: '',
  isbn: '',
  año_publicación: '',
  nro_ejemplar: '',
  origen: '',
  } */

const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js');

  const LibrosSchema = sequelize.define("libros", {
    libro_id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    biblio_aulica_id:{
        type:Sequelize.DataTypes.INTEGER,
    },
    nro_libro_id:{
        type:Sequelize.DataTypes.INTEGER,
    },
    titulo:{
        type:Sequelize.DataTypes.TEXT,
        //allowNull: false,
        //unique: true
    },
    isbn:{
        type:Sequelize.DataTypes.TEXT,
        allowNull: false,
        //unique: true
    },
    anio_publicacion:{
        type:Sequelize.DataTypes.INTEGER,
        //allowNull:false
    },
    nro_ejemplar:{
        type:Sequelize.DataTypes.INTEGER,
        //allowNull:false
    },
    origen:{
        type:Sequelize.DataTypes.TEXT,
        //allowNull:false
    },
})

  module.exports = LibrosSchema;