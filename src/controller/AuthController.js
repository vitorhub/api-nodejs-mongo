// faz a operação de comparação da model
const express = require('express');

const UserModel = require('../models/User'); /* importa model usuario */

const router = express.Router();   /* Para criar a rota */

router.post("/register", async (req, res) => {  /* Quando vier um post da rota register */

    const { email } = req.body
    if (await UserModel.findOne({ email })) {
        return res.status(400).json({   // envia resposta com status 4400 e o json  
            error: true,
            message: "User already exists"
        })
    }

    const User = await UserModel.create(req.body)  // Cria no mongo o registro do modelo usuário com os dados de req.body

    User.password = undefined; // Remove password do User quando create

    return res.json({
        error: false,
        message: "Registered with success",
        data: User
    })
})

module.exports = router;