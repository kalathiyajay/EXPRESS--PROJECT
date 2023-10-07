require("dotenv").config();
const express = require('express');
const server = express();
const ejs = require('ejs');
const port = process.env.PORT || 5050;
const cors =require('cors')
const userRoutes = require("./Routes/user.Routes.js");
const productRooutes = require("./Routes/product.Routes.js");
const mongoose = require('mongoose');
const cartRoutes = require("./Routes/cart.Routes.js");
const orderRoutes = require("./Routes/orders.Routes.js");

mongoose
    .connect(process.env.MONGO_DB_ATLAS_PATH)
    .then(() => console.log("DB IS CONNECTED"))
    .catch((err) => { console.log(err); })



server.set('view engine', 'ejs');
server.use(express.json());
server.use(cors());
server.use('/images',express.static("./images"));

server.get('/', (req, res)=>{
    let model = {
        name: 'Skill',
        course: 'Node.js',
        fees: 80000
    };
    res.render('student', model);
})

server.use("/api/user",userRoutes);
server.use("/product",productRooutes);
server.use("/cart",cartRoutes);
server.use('/order',orderRoutes);

server.listen(port,()=>{
    console.log(`Server Is Connected At ${port}`);
});