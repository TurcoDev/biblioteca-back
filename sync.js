
const sequelize = require('./src/config/db.js'); 
const User = require('./src/services/models/userModel.js');
const Role = require('./src/services/models/roleModel.js');
const Author = require('./src/services/models/authorsModel.js');

// Hay que importar los demas modelos que se necesiten subir a la Cucaracha.

(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexión establecida correctamente.');

    // Sincroniza todos los modelos con la base de datos
    await sequelize.sync({ alter: true }); 


    console.log('Todos los modelos se han sincronizado con la base de datos.');

    process.exit(0); // Salir del proceso Node.js
  } catch (error) {
    console.error('Error al conectar con la base de datos o sincronizar modelos:', error);
    process.exit(1); // Salir del proceso con error
  }
})();