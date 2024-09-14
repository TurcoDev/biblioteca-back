
const sequelize = require('./src/config/db.js'); 
const User = require('./src/models/userModel.js');
const Role = require('./src/models/roleModel.js');
const Author = require('./src/models/authorsModel.js');
const Book = require('./src/models/bookModel.js');
const Classroom = require('./src/models/classroomModel.js')

// Importar modelos
require('./src/models/userModel.js');
require('./src/models/roleModel.js');
require('./src/models/authorsModel.js');
require('./src/models/bookModel.js');
require('./src/models/studentsModel.js');
require('./src/models/loansModel.js');
require('./src/models/classroomLibraryModel.js'); 
require('./src/models/bookAuthorModel.js');

// Ejecutar la sincronización de los modelos
(async () => {
  try {
    // Autenticación con la base de datos
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });

    console.log('Todos los modelos se han sincronizado con la base de datos.');

    process.exit(0); // Salir del proceso Node.js
  } catch (error) {
    console.error('Error al conectar con la base de datos o sincronizar modelos:', error);
    process.exit(1); // Salir del proceso con error
  }
})();
