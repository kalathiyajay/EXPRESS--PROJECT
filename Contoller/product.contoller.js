const Product =require("../Model/product.Model.js");


exports.addProduct=async(req,res)=>{
    const {title,discription,price,image,category} =req.body;

    const newProduct = await Product.findOne({title:title});

    if(newProduct)
    {
        return res.json({message:"Product Is Allready exist..."})
    }

    if(req.file)
    {
        productImage = `http://${process.env.IP}:${process.env.PORT}/${req.file.path}`
    }

    newProduct = await Product.create({
        title,
        discription,
        price,
        image:productImage,
        category,
    });

    res.json({newProduct,Massage:"New Product Is Added..."})
};


exports.allProductData = async (req,res)=>{
    const allData = await Product.find({isDelete:false});

    if(!allData)
    {
        return res.json({message:"Product Not Found"})
    }
    res.json(allData);
};

exports.specificData = async (req,res) =>{
    let id = req.params.id;
    const data = await Product.findOne({_id:id});
    if(!Data)
    {
        return res.json({message:"Product Not Found"})
    }
    res.json(data);
};

exports.updateProductData = async (req,res)=>{
    let id = req.params.id;
    const updateData = await Product.findOneAndUpdate({_id:id},req.body,{new:true});
    if(!updateData)
    {
        return res.json({message:"Product Not Found"})
    }
    res.json({updateData,message:"Product Is Upadted"});
}

exports.deleteProductData = async (req,res)=>{
    let id = req.params.id;
    const delerteData = await Product.findId(id);
    if(!delerteData)
    {
        return res.json({message:"Product Not Found"})
    }

    delerteData = await Product.findOneAndUpdate(id,{isDelete:true},{new:true})
    
    res.json({delerteData,message:"Product Is Deleted"});
}
