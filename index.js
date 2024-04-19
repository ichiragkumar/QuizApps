const express = require("express")
require("dotenv").config()
const db = require("./db/connectdb")
var cron = require('node-cron');
const Quiz = require("./models/quizesdb")


cron.schedule('* * * * * *', async () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); 
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    const updateStatus = await Quiz.updateMany({endDate: { $lte: currentDate },}, {$set: { isActive: false },})
  });


const app = express()


const PORT = process.env.PORT

const usersRoutss = require("./routes/users")
const quizesRoutes = require("./routes/quizes")

app.use("/api/v1/users",usersRoutss)
app.use("/api/v1/quizzes",quizesRoutes)


app.get("/", (req, res)=>{
    res.send("<center><h1>Welcom To Quiz App</h1></center>");
})





app.listen(PORT, ()=>{
    console.log(`server is running at  http://localhost:${PORT}/`);
})
