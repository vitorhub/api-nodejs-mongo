// vitorfalcao
// oMZ3ZgCOGLKdPNuy
// mongodb+srv://vitorfalcao:<password>@liveapimongo.n4o0wpi.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://vitorfalcao:oMZ3ZgCOGLKdPNuy@liveapimongo.n4o0wpi.mongodb.net/?retryWrites=true&w=majority", {}, (error)=>{
    if(error){
        console.log("FALHA AO AUTENTICAR COM MONGODB")
        console.log(error)
        return;
    }
    console.log("Conexão com mongodb estável")
})

mongoose.Promise = global.Promise; // Configuração que o mongo pede quando trabalha com nodejs

module.exports = mongoose; // exportando objeto mongoose sera usado na model