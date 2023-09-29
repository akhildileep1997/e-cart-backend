//logic for cart
//import carts from model
const carts = require('../models/cartSchema')

//add to cart collection
exports.addToCart = async(req,res)=>{
    //get products details from the request
    const{id,title,price,image,quantity}=req.body //destructuring
    //logic
    try{
     //check if the product is already in the cart
     const products = await carts.findOne({id})
     if(products)
     {
       //product present in cart then update quantity and price
       products.quantity+=1
       //update grand total
       products.grandTotal=products.price*products.quantity
       //save changes to db
       products.save()
       //sen response back to the user
       res.status(200).json('product details updated')
     }
     else{
        // product is not present in the cart,Add product to cart
        const newProduct = new carts({
            id,
            title,
            price,
            image,
            quantity,
            grandTotal:price
        })
        //save newProduct details
         newProduct.save()
        // send response back to user
        res.status(200).json("product added successfully") 
        
     }
    }
    catch(error){
     res.status(404).json(error)
    }
}
//view cart
exports.viewCartItems = async(req,res)=>{
  try{
    const item = await carts.find()
    if(item){
      res.status(200).json(item)
    }else{
      res.status(400).json("error")
    }
  }
  catch(error){
   res.status(404).json(error)
  }
}

//delete item from cart
exports.deleteCartItem = async(req,res)=>{
  //get id from request
  const{id}=req.params
  //remove product from cart
  try{
    const removeProduct = await carts.deleteOne({id}) //product deleted
    if(removeProduct.deleteCount!=0){
      //get all remaining products from cart
      const remainingProducts = await carts.find()
      res.status(200).json(remainingProducts) //response send back client
    }
  }
  catch(error){
  res.status(404).json(error)
  }
}

//logic for incrementing product in cart
exports.incrementProductCount = async(req,res)=>{
  //product id
const{id}=req.params
try{
  //if product id is already in cart increment the quantity by one
  const item = await carts.findOne({id})
  if(item){
   item.quantity+=1;
   item.grandTotal=item.quantity*item.price
   //save changes in db
   await item.save()
   //send updated result to the client side
   const allProduct = await carts.find()
   //send back response to user
   res.status(200).json(allProduct)
  }else{
    res.status(401).json("product not found")
  }
}
catch(error){
res.status(401).json(error)
}
}

//logic for decrementing product in cart
exports.decrementCartItem = async(req,res)=>{
  const{id}=req.params
try{
  const product = await carts.findOne({id})
  if(product){
    product.quantity-=1;
    if(product.quantity==0){
      await carts.deleteOne({id})
      //remaining product will be updated to cart
      const allCart = await carts.find()
      res.status(200).json(allCart)
    }else{
      product.grandTotal=product.quantity*product.price
      await product.save()
      const remainingProducts = await carts.find()//fetching remaining product
      res.status(200).json(remainingProducts)
    }

  }else{
    res.status(400).json('product not found')
  }
}
catch(error){
  res.status(401).json(error)
}
}