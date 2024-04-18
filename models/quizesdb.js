const mongoConnect = require("../db/connectdb")

const quizsSchema = new mongoConnect.Schema({
    
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
        }



})

const Quizes = mongoConnect.model("Quiz", quizsSchema)
module.exports = Quizes