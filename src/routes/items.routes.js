const express = require("express");
const router = express.Router();
const { getItems, createItem, getItemById, updateItem, deleteItem } = require('../controllers/items.controller');


router.get('/items', getItems);

router.post('/items', createItem);

router.get('/items/:id', getItemById);

router.put('/items/:id', updateItem);

router.delete('/items/:id', deleteItem);

module.exports = router;