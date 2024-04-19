const express = require("express")
const router = express.Router()
router.use(express.json())
const Quiz = require("../models/quizesdb")
const createQuizSchema = require("../controller/quizinputvalidators")


// create quiz
router.post("/create", async (req, res)=>{
    const requestBody= req.body;
    requestBody.startDate = new Date(requestBody.startDate);
    requestBody.endDate = new Date(requestBody.endDate);

    const parsedResult = createQuizSchema.safeParse(requestBody)

    if (parsedResult.success) {
        const startDate = parsedResult.data.startDate
        const endDate = parsedResult.data.endDate
        if(startDate<endDate){
            try {
                const quiz = await Quiz.create({
                    question:req.body.question,
                    options:req.body.options,
                    rightAnswer:req.body.rightAnswer,
                    startDate:req.body.startDate,
                    endDate:req.body.endDate
            
                })
                res.status(201).json({
                    quiz,
                    msg:"created succesfully"
                })

            } catch (error) {
                console.log(`Database Error ${error}`)
                res.status(411).json({
                    quiz,
                    msg:"Database Error"
                })
                
            }
           
        }else{
            res.status(403).json({
                msg:"Start Date should not be grator than End Date"
            })
        }
    } else {
        const error = parsedResult.error;
        console.log(error);
        // Handle the validation error
        res.status(201).json({
            msg:"Invalid Input"
        })
    }

   
       
       

   


    


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