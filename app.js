// Importar módulos necesarios
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const usuariosRouter = require('./src/routes/usuarioRouter.js');




// Rutas para usuarios
app.use('/usuarios', usuariosRouter);


// Puerto de escucha
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
