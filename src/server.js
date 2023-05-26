const express = require('express')
const app = express()
const AuthController = require('./controller/AuthController')

app.use(express.json()) // para o servidor receber dados via json

app.use('/auth', AuthController) // usa auth primeiro depois a rota authcontroller

app.listen(3001, ()=>{ // escuta porta 3001
    console.log("Server is running");
})