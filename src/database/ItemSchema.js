
// Iniciamos una instancia de Sequelize y la conexión a la base de datos
const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js');

// Esema de la tabla libros de la base de datos
// TODO falta definir bien cada campo
const ItemSchema = sequelize.define("libros", {
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

  module.exports = ItemSchema;