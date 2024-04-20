const mongoose = require("mongoose")
require("dotenv").config()


const DATABASE_URL = process.env.DB_URL
mongoose.connect(DATABASE_URL)

