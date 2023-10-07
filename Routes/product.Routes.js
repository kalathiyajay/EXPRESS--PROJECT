const express = require('express');
const uplode =require("../middlewer/uplodeImages.js");
const { addProduct,
    allProductData,
    specificData,
    updateProductData,
    deleteProductData
} = require('../Contoller/product.contoller.js')
const productRoutes = express.Router();

productRoutes.post('/',uplode.single('images'), addProduct);
productRoutes.get('/', allProductData);
productRoutes.get('/:id', specificData);
productRoutes.patch('/:id', updateProductData);
productRoutes.delete('/:id', deleteProductData);


module.exports = productRoutes;