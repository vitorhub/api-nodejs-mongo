// faz a operação de comparação da model
const express = require('express');

const UserModel = require('../models/User') /* importa model usuario */

const router = express.Router();   /* Para criar a rota */

router.post("/register", (req, res)=>{  /* Quando vier um post da rota register */
    console.log(req.body);
    return res.json({
        error: false,
        message: "Registered with success",
    })
})

module.exports = router;