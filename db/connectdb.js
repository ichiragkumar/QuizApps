const mongoose = require("mongoose")
const mongoConnect = mongoose.connect("mongodb+srv://testme:testme@atlascluster.2bagtvb.mongodb.net/QuizApp")

module.exports = mongoConnect