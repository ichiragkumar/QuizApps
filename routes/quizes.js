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


// working on get active quiz
// Please note that IST is 5 hours and 30 minutes ahead of UTC
router.get("/active", async (req, res)=>{
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Subtract 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    const activeQuiz = await Quiz.find({ endDate: { $gt: currentDate } });
    if (activeQuiz.length === 0) {
        res.status(200).json({
            activeQuiz,
            msg:"No Active Quiz"
        })
    } else {
        res.status(200).json({
            activeQuiz,
            msg:"Active Quizes"
        })
    }
}

)

 







// Get result
router.get("/:id/result",async (req, res)=>{
    const getQuizId = req.params.id    
    try {
        const quizResult = await Quiz.find({
            _id:getQuizId,
            endDate: { $gte: afterFiveminutes }

        })

        const describeResult = quizResult.map(quiz=>{
            const endTime = quiz.endDate
            const afterFiveminutes = new Date(endTime.getTime() + (5 * 60000));
            if(afterFiveminutes>endTime){
                return {
                    rightAnswer: quiz.rightAnswer,
                    _id: quiz._id,
                    endTime:endTime.toString(),
                    afterFiveminutes:afterFiveminutes.toString()
                };
            } 
        })

       



        res.status(200).json({ 
            describeResult,
            msg:"Quiz Result"
         });
    } catch (error) {
        console.log(error);
        res.status(411).json({ 
            msg:"Server Error"
         });
        
    }
    
   

})


// get all the quizes [Active or Inactive]
router.get("/all", async (req, res)=>{
    const allQuiz = await Quiz.find({})
    res.status(201).json({
        allQuiz,
        msg:"got the all quiz"
    })
})



module.exports = router