// define routes for client requests

//1 import express
const express = require('express')

//4 import product controller
const productController = require('../controllers/productController')
// import wishlists controller
const wishlistController = require('../controllers/wishlistController')
// import cart controller
const cartController = require('../controllers/cartController')

//2 using express create object for router class in order to setup path
const router = new express.Router()

//3 Use router object to resolve client request
  // get all products api request
    router.get('/products/all-products',productController.getAllProducts)

 // get a particular product details view
    router.get('/products/view-product/:id',productController.viewProduct)    

// add new product to wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)    

//view all wish list item
router.get('/wishlists/view-all-wishlist',wishlistController.getWishlistItems)

// delete particular wishlist item
router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteWishlist)

//add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

//display cart product
router.get('/carts/view-cart-items',cartController.viewCartItems)

//delete item from cart
router.delete('/carts/delete-cart-item/:id',cartController.deleteCartItem)

//increment cart item and grand total
router.get('/carts/increment-cart-product/:id',cartController.incrementProductCount)

//decrement cart item
router.get('/carts/decrement-cart-product/:id',cartController.decrementCartItem)

//5 export routes to main page
module.exports=router
