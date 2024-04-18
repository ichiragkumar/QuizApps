const mongoConnect = require("../db/connectdb")

const UserSchem = new mongoConnect.Schema({
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

module.exports = UserSchem