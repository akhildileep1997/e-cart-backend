//1 import mongoose
const mongoose = require('mongoose')

//2 define schema for collection to store products
const wishlistSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
     price:{
          type:Number,
          required:true
     },
     image:{
     type:String,
     required:true
     }
   
})

//3 create a Model to store product
const wishlists = new mongoose.model('wishlists',wishlistSchema)

//4export the model
module.exports=wishlists