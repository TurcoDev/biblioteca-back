 /*const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'BibliotecaBack'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection; */
require('dotenv').config()

const Sequelize = require("sequelize-cockroachdb");

// Connect to CockroachDB through Sequelize.
const connectionString = process.env.DATABASE_URL
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "biblioteca-back",
  }
});

module.exports = sequelize
