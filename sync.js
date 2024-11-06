const sequelize = require('./src/config/db.js');

// Importar los modelos necesarios
const User = require('./src/models/userModel.js');
const Role = require('./src/models/roleModel.js');
const Author = require('./src/models/authorsModel.js');
const Book = require('./src/models/bookModel.js');
const BookAuthor = require('./src/models/bookAuthorModel.js');
const ClassroomLibrary = require('./src/models/classroomLibraryModel.js');
const Section = require('./src/models/sectionModel.js');
const Student = require('./src/models/studentModel.js');
const Loan = require('./src/models/loanModel.js');

// Ejecutar la sincronización de los modelos
(async () => {
  try {
    // Autenticación con la base de datos
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Sincronizar los modelos con la base de datos respetando la estructura SQL proporcionada
    await sequelize.sync({ force: false });  // Elimina y recrea las tablas (solo para desarrollo)
    
    console.log('Todos los modelos se han sincronizado con la base de datos.');

    process.exit(0);  // Salir del proceso Node.js
  } catch (error) {
    console.error('Error al conectar con la base de datos o sincronizar modelos:', error);
    process.exit(1);  // Salir del proceso con error
  }
})();
