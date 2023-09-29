// Logic for getting all products from mongodb

//1 import product collection
const products = require('../models/productSchema')

//3 create a function for getting all products
exports.getAllProducts=async(req,res)=>{
    //get all products from mongodb
    try{
       const allProducts = await products.find()
       res.status(200).json(allProducts) //response send back to client
    }
    catch(error){
       res.status(401).json(error)//error message send back to client
    }
}

//4 view particular product details
exports.viewProduct=async(req,res)=>{
   //get product id from request params
   const id = req.params.id;
   try{
   //check if id present in database
   const product = await products.findOne({id})
   if(product){ //if product is present
      res.status(200).json(product)
   }
   else{ //if product is not present
      res.status(401).json("product not found")
   }
   }
   catch(error){
      res.status(404).json(error)
   }
}