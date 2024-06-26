const mongoConnect = require("../db/connectdb")
const mongoose = require("mongoose")

const quizsSchema = new mongoose.Schema({
    
        question:{
            type: String,
            required: true,


        },

        options:{
            type: [String],
            required: true,
            

        },

        rightAnswer:{
            // right now , only one CORRECT ANSWER [index 0 to 3]
            type: Number,
            required:true,
        },

        startDate:{
            type: Date,
            default:Date.now()
        },

        endDate:{
            type: Date,
            default:Date.now()
        },
        isActive:{
            type: Boolean,
            default: true,
            
        }



})

const Quizes = mongoose.model("Quiz", quizsSchema)
module.exports = Quizes