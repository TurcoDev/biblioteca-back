const {getItemsService, getItemByIdService, createItemService, updateItemService, deleteItemService} = require('../services/models/itemsModel');

const getItems = async (req, res) => {
  try {
    const items = await getItemsService();
    
    //console.log('items', items)
    
    res.status(200).send({message: 'Items', data: items});
  } catch (error) {
    console.error(error);
    res.status(500).send({message: error.message, data: []});
  }
};

const getItemById = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await getItemByIdService(itemId);
    //console.log('item', item)
    
    res.status(200).send({message: 'Item', data: item});
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({message: `Libro id: ${itemId} no encontrado`, data: []});
    } else {
      res.status(500).send({message: error.message, data: []});
    }
  }

};

const createItem = async (req, res) => {
  const itemData = req.body;
  try {
    const item = await createItemService(itemData);
    
    res.status(201).send({message: 'Item created', data:item});
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message, data: []});
  }

};

const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const itemData = req.body;
  try {
    const updatedItem = await updateItemService(itemId, itemData);
    //console.log('updatedItem', updatedItem);

      res.status(200).send({message: `Libro ${itemId} actualizado`, data: updatedItem});
    
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({message: `Libro id: ${itemId} no encontrado`, data: []});
    } else {
      res.status(500).send({message: error.message, data: []});
    }
  }
};

const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const itemDeleted = await deleteItemService(itemId);
    //console.log(itemDeleted)
    
    res.status(200).send({message: `Libro ${itemId} eliminado`, data: itemId});
  } catch (error) {
    console.log(error);
    if(error.message === 'Not found') {
      res.status(404).send({message: `Libro id: ${itemId} no encontrado`, data: []});
    } else {
      res.status(500).send({message: error.message, data: []});
    }
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};