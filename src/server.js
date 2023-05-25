const express = require('express')
const AuthController = require('./controller/AuthController')

const app = express()

app.use('/auth', AuthController)
// res.send('Hello World');

app.listen(3001, ()=>{
    console.log("Server is running");
})