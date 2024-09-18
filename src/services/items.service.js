// TODO importar los modelos de sequelize

const {testItems} = require('../data/items');

const getItemsService = async () => {
  try {
    //const items = await items.findAll();
    const items = testItems;

    return items;
  } catch (error) {
    throw error;
  }
};

const getItemByIdService = async (itemId) => {
  try {
    //const item = await
    
    return item;
  } catch (error) {
    throw error;
  }
};

const createItemService = async (itemData) => {
  try {
    //const item =
    
    return item;
  } catch (error) {
    throw error;
  }
};

const updateItemService = async (itemId, itemDataToUpdate) => {
  try {
    //const item =
    
    return item;
  } catch (error) {
    throw error;
  }
};

const deleteItemService = async (itemId) => {
  try {
    //const item = await
    
    return item;
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