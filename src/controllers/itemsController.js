const {getItemsService, getItemByIdService, createItemService, updateItemService, deleteItemService} = require('../services/items.service');

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
    if(item) {
      item.length > 0 
      ? res.status(200).send({message: 'Item', data: item}) 
      : res.status(404).send({message: 'Item not found, could not be updated', data: []})
    };
  } catch (error) {
    console.error(error);
    res.status(500).send({message: error.message, data: []});
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
    if(updatedItem) {
      updatedItem.length > 0 
      ? res.status(200).send({message: 'Item updated', data: updatedItem}) // TODO ver si es un id o el objeto item
      : res.status(404).send({message: 'Item not found, could not be updated', data: []})
    };
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message, data: []});
  }
};

const deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const itemDeleted = await deleteItemService(itemId);
    //console.log('itemDeleted', itemDeleted);
    if(itemDeleted) {
      itemDeleted.length > 0 
      ? res.status(200).send({message: 'Item deleted', data: {id: itemId}}) 
      : res.status(404).send({message: 'Item not found, could not be deleted', data: []})
    };
  } catch (error) {
    console.log(error);
    res.status(500).send({message: error.message, data: []});
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};