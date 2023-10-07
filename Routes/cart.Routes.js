const express = require('express');
const { veryfyToken } = require('../middlewer/userToken.js');
const { addToCart, getAllCart, cartData, replaceCartData, deleteCartData } = require('../Contoller/cart.contoller.js');
const cartRoutes = express.Router();


cartRoutes.post("/add-cart", veryfyToken, addToCart);
cartRoutes.get("/my-cart", veryfyToken, getAllCart);
cartRoutes.get("/:id", veryfyToken, cartData);
cartRoutes.patch("/:id", veryfyToken, replaceCartData);
cartRoutes.delete("/:id", veryfyToken, deleteCartData);



module.exports = cartRoutes;