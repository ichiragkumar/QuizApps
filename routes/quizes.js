const express = require("express")
const router = express.Router()




// create quiz
router.post("/create", (req, res)=>{
    res.status(201).json({
        msg:"created"
    })




})


// get all the active quizes
router.get("/active", (req, res)=>{
    res.status(201).json({
        msg:"got active quiz"
    })


})


// Get wuiz result
router.get("/:id/result", (req, res)=>{

    res.status(201).json({
        msg:"got the result"
    })

})


// get all the quizes [Active or Inactive]
router.get("/all", (req, res)=>{

    res.status(201).json({
        msg:"got the all quiz"
    })
})



module.exports = router