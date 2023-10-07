const express = require('express');
const { veryfyToken } = require('../middlewer/userToken');
const { getMyAllOrders, addOrder, specificOrder, updateOrder, deleteOrder } = require('../Contoller/orders.contoller');
const orderRoutes = express.Router();


orderRoutes.post('/add-order',veryfyToken,addOrder);
orderRoutes.get('/all-order',veryfyToken,getMyAllOrders);
orderRoutes.get('/:id',veryfyToken,specificOrder);
orderRoutes.put('/:id',veryfyToken,updateOrder);
orderRoutes.delete('/:id',veryfyToken,deleteOrder);

module.exports =orderRoutes;
