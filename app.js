// Importar módulos necesarios
require('dotenv').config(); // Para usar variables de entorno
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conexion = require('./src/config/db.js')
const app = express();

// Configurar CORS
app.use(cors({
    origin: 'http://127.0.0.1:5173' // URL donde corre Vite React
}));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const authRoutes = require('./src/routes/authRoutes.js');
const authorRoutes = require('./src/routes/authorRoutes.js');
const bookRoutes = require('./src/routes/bookRoutes.js');
const booksAuthorsRoutes = require('./src/routes/booksAuthorsRoutes.js');
const classroomLibraryRoutes = require('./src/routes/classroomLibraryRoutes.js');
const loanRoutes = require('./src/routes/loanRoutes.js');
const roleRoutes = require('./src/routes/roleRoutes.js');
const sectionRoutes = require('./src/routes/sectionRoutes.js');
const studentRoutes = require('./src/routes/studentRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');


// Rutas para usuarios
app.use('/', authRoutes);
app.use('/autor', authorRoutes);
app.use('/biblioteca', classroomLibraryRoutes);
app.use('/estudiante', studentRoutes);
app.use('/libro', bookRoutes);
app.use('/libros-autor', booksAuthorsRoutes);
app.use('/prestamo', loanRoutes);
app.use('/rol', roleRoutes);
app.use('/seccion', sectionRoutes);
app.use('/usuario', userRoutes);

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