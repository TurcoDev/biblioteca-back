// Importar módulos necesarios
require('dotenv').config(); // Para usar variables de entorno
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conexion = require('./src/config/db.js')


// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const usuariosRouter = require('./src/routes/usuarioRoutes.js');
const booksRouter = require('./src/routes/bookRoutes.js');
const aulasRouter = require('./src/routes/Classroom.Routes.js');
const authorsRouter = require('./src/routes/authorsRoutes.js');

// Rutas para usuarios
app.use('/', authRoutes);
app.use('/autores', authorRoutes);
app.use('/libros', bookRoutes);
app.use('/libros-autor', booksAuthorsRoutes);
app.use('/prestamos', loanRoutes);
app.use('/roles', roleRoutes);
app.use('/usuarios', userRoutes);
app.use('/biblioteca', classroomLibraryRoutes);
app.use('/secciones', sectionRoutes);
app.use('/estudiantes', studentRoutes);

conexion.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

// Puerto de escucha
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("corriendo en el puerto", PORT);

})