// logic for wishlist

// import wishlist from model
const wishlists = require('../models/wishlistSchema');

// const wishlist = require('../models/wishlistSchema')

// logic for add wishlist
exports.addToWishlist = async(req,res)=>{
    //get wishlist product details

    //req.body={
    //     id:456,
    //     title:Abcde, =>this is the correct method but  cant use here so destructuring used
    //     price:569
    // }

    //Destructuring is used
    const {id,title,price,image} = req.body;
    //logic
    try{
    //check the product already available in wishlist
    const item = await wishlists.findOne({id})
    if(item)
    {
        res.status(403).json("item already exist in the wishlist")
    }
    else{
        //add item to the wishlist
        const newProduct = new wishlists({id,title,price,image})
        //store nreProduct in the wishlist
        await newProduct.save()
        //send response back to the client
        res.status(200).json("product added successfully")
    }
    }
    catch(error){
     res.status(401).json(error)
    }

}


//get all wishlist products
exports.getWishlistItems = async(req,res)=>{
    //logic
    try{
        const wishlistProducts = await wishlists.find()
        res.status(200).json(wishlistProducts) // contain the details of all products in wishlist
    }
    catch(error){
      res.status(400).json(error)
    }
}
//delete item from wishlist
exports.deleteWishlist = async(req,res)=>{
  //logic get all remaining wishlists products after deleting the particular product
  //get id from path parameter
  const{id}=req.params//=> destructuring
  try{
   const deleteProduct = await wishlists.deleteOne({id}) 
    //get remaining product detail after deleting the particular product
    if(deleteProduct){
      const allItem = await wishlists.find()
      res.status(200).json(allItem)
    }
  }
  catch(error){
  res.status(400).json(error)
  }
}