const mongoConnect = require("../db/connectdb")

const UserSchema = new mongoConnect.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }


})


const User = mongoConnect.model("User", UserSchema)
module.exports = User