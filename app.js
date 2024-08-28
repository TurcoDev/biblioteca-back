// Importar módulos necesarios
require('dotenv').config(); // Para usar variables de entorno
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const usuariosRouter = require('./src/routes/usuarioRoutes.js');
const itemsRouter = require('./src/routes/itemsRoutes.js');
const aulasRouter = require('./src/routes/aulasRoutes.js');
const authorsRouter = require('./src/routes/authorsRoutes.js');


// Rutas para usuarios
app.use('/usuarios', usuariosRouter);
app.use('/items', itemsRouter);
app.use('/aulas', aulasRouter);
app.use('/authors', authorsRouter);


// Puerto de escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
