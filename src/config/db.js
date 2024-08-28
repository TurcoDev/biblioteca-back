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
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Usar la variable de entorno para la conexión
const connectionString = process.env.DATABASE_URL;

// Verificar que la URL no sea undefined antes de crear la instancia de Sequelize
if (!connectionString) {
  throw new Error('La variable de entorno DATABASE_URL no está definida');
}

const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "biblioteca-back",
  }
});

module.exports = sequelize;
