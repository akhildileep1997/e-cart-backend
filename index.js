//1 Automatically load .env file into the application
require('dotenv').config()

//2 import express
const express=require('express')

//6 import cors
const cors = require('cors')

//10 import connection.js
require('./connection')

//11 import router
const router = require('./routes/router')

//3 create an application using express
const server=express()

//4 define the port
const PORT = 5000

//7 use cors in server app
server.use(cors())
// 8
server.use(express.json())
// 12
server.use(router)

//5 run the application
server.listen(PORT,()=>{
    console.log('listening on the port'+PORT);
})

//9 define routes
server.get('/',(req,res)=>{
    res.status(200).json('E-commerce service started')
})
