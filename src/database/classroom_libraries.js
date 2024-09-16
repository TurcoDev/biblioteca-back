const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js');

const ClassroomSchema = sequelize.define('classroom_libraries',{
    classroom_libraries_id: {
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    }
})

module.exports = ClassroomSchema