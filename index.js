const express = require("express")
require("dotenv").config()

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
