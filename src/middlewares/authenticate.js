const jwt = require("jsonwebtoken")
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    console.log("middleware")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token not provided"
        })
    }

    const parts = authHeader.split(" ")
    if (parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: "Invalid token type"
        })
    }

    const [scheme, token] = parts

    if (scheme.indexOf("Bearer") !== 0) {
        return res.status(401).json({
            error: true,
            message: "Badly formatted token"
        })
    }
    console.log(err)
    console.log(decoded)

    return jwt.verify(token, authConfig.secret, (err, decoded) => {
        // decoded recebe o jwt sign id e nome do AuthController
        if (err) {
            return res.status(400).json({
                error: true,
                message: "Token invalid/expired"
            })
        }

        req.userLoged = decoded;

        
        return next()
    }) // pede tres parametros o token(a segunda parte) e a chave de acesso
    
}