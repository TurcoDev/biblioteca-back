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
const aulasRouter = require('./src/routes/aulasRoutes.js');
const authorsRouter = require('./src/routes/authorsRoutes.js');
const authRouter = require('./src/routes/authRoutes.js');
const sectionsRouter = require('./src/routes/sectionsRoutes.js');
const roleRouter = require('./src/routes/roleRoutes.js');
const bookAuthorRouter = require('./src/routes/bookAuthorRoutes.js')
const loansRouter = require('./src/routes/loansRoutes.js')
const studentsRouter = require('./src/routes/studentsRoutes.js')

// Rutas para usuarios
app.use('/',authRouter);
app.use('/usuarios', usuariosRouter);
app.use('/books', booksRouter);
app.use('/aulas', aulasRouter);
app.use('/authors', authorsRouter);
app.use('/sections', sectionsRouter);
app.use('/roles', roleRouter);
app.use('/bookAuthors',bookAuthorRouter);
app.use('/loans', loansRouter);
app.use('/students', studentsRouter);

 // Puerto de escucha
const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("corriendo en el puerto",PORT);

})
            