const mongoose = require('../database/index')  // conexão já foi feita na database/index. mongoose exportado.

const bcryptjs = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,   // unico email dentro do banco
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // para não mostrar o password pois é sigiloso
    },
    createdAt: {
        type: Date,     // campo do tipo data
        default: Date.now // data padrao da hora em que foi cadastrado
    }
})
UserSchema.pre("save", async function (next) { // antes do save executa o hash
    const hash = await bcryptjs.hash( this.password, 10) // função do bcryptjs que cria o hash 10*
    this.password = hash // atribui ao password o hash
})

const User = mongoose.model("User", UserSchema); // nome da model e qual seu esquema

module.exports = User;