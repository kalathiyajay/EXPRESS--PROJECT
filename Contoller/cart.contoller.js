const Cart = require("../Model/cart.Model.js");

exports.addToCart = async (req, res) => {
    const { product, quantity } = req.body;

    let newCart = await Cart.findOne({ product });
    if (newCart) {
        return res.json({ message: "Cart Product Is Already Exist.." })
    }

    newCart = await Cart.create({
        user: req.user._id,
        product, 
        quantity
    });
    res.json({ message: "Cart Is Added.." })
};

exports.getAllCart = async (req, res) => {
    let myCarts = await Cart.find({ user: req.user._id });
    res.json({ myCarts, message: "All Cart Items" });
};

exports.cartData = async (req,res)=>{
    let ID = req.params.id
    let data = await Cart.findById(ID);
    res.json(data);
}

exports.replaceCartData = async (req,res)=>{
    let ID = req.params.id
    let removeData = await Cart.findByIdAndUpdate(ID,req.body,{new:true});
    res.json(removeData);
}

exports.deleteCartData = async (req,res)=>{
    let ID = req.params.id
    let deleteData = await Cart.findById(ID);

    deleteData = await Cart.findByIdAndDelete(ID,
        {isDelete:true},
        {new:true});
    res.json(deleteData);
}