// faz a operação de comparação da model
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authConfig = require("../config/auth.json")
const UserModel = require('../models/User'); /* importa model usuario */

const router = express.Router();   /* Para criar a rota */

const generateToken = (user = {})=>{
    return jwt.sign({
        id: user.id,
        name: user.name
    },authConfig.secret, {
        expiresIn: 86400
    } ) // dados que vao dentro do token, são tres parametros dentro de chaves

return res.json({
    user,
    token
})
}

router.post("/register", async (req, res) => {  /* Quando vier um post da rota register */

    const { email } = req.body
    if (await UserModel.findOne({ email })) { // se encontra email
        return res.status(400).json({   // envia resposta com status 400 e o json  
            error: true,
            message: "User already exists"
        })
    }

    const user = await UserModel.create(req.body)  // Cria no mongo o registro do modelo usuário com os dados de req.body

    user.password = undefined; // Remove password do User quando create

    return res.json({
        user,
        token: generateToken(user)
    })
})

router.post("/authenticate", async function (req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password"); // encontra email e retorna junto o password

    if (!user) {
        return res.status(400).json({
            erro: true,
            message: 'User not found'
        })
    }
    if (!await bcrypt.compare(password, user.password)) { // se senha nao sao iguais
        return res.status(400).send({
            error: true,
            message: "Invalid password"
        })
    }

    user.password = undefined

    return res.json({
        user,
        token: generateToken(user)
    })
})

module.exports = router;