// Modelos
// TODO importar los modelos de sequelize

/* // Datos de prueba, eliminar cuando se conecte realmente a la db
const {librosTest} = require('../data/libros');
// Conexioon a la base de datos
const db = require('../config/db.js'); */

// Conexion a la base de datos
const Sequelize = require('sequelize-cockroachdb')
const sequelize = require('../config/db.js');
// Esquema de prueba
const LibrosSchema = require('../database/libroSchema.js');

const getItemsService = async () => {
  try {
    //const items = await items.findAll();
    /* const items = librosTest; */
    const items = LibrosSchema.findAll(); // conecta con la db y trae todos los items

    return items;
  } catch (error) {
    throw error;
  }
};

const getItemByIdService = async (itemId) => {
  try {
    const item = librosTest.filter(libro => libro.libro_id == itemId);

    if(item.length == 0) {
      throw new Error('Not found');
    };
    
    return item;
  } catch (error) {
    throw error;
  }
};

const createItemService = async (itemData) => {
  try {
    /* const libroId = librosTest.length + 1;
    itemData.libro_id = libroId;
    librosTest.push(itemData);
    console.log('librosTest', librosTest); */
    let item = await LibrosSchema.sync({force: false}) // crea la tabla y si ya existe la actualiza, no la vuelve a crear
    item = await LibrosSchema.create(itemData) // inserta los datos que vienen en itemData
    
    return item;
  } catch (error) {
    throw error;
  }
};

const updateItemService = async (itemId, itemDataToUpdate) => {
  try {
    const index = librosTest.findIndex(libro => libro.libro_id == itemId);
    if(index == -1) {
      throw new Error('Not found');
    }
    librosTest[index] = itemDataToUpdate;
    
    return librosTest;
  } catch (error) {
    throw error;
  }
};

const deleteItemService = async (itemId) => {
  try {
    const index = librosTest.findIndex(libro => libro.libro_id == itemId);
    if(index == -1) {
      throw new Error('Not found');
    };

    const item = librosTest.splice(index, 1);
    
    return librosTest;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getItemsService,
  getItemByIdService,
  createItemService,
  updateItemService,
  deleteItemService
}