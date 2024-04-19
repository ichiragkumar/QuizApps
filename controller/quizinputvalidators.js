const zod = require("zod")

// creating schema for createQuiz
const createQuizSchema = zod.object({
    question: zod.string(),
    options: zod.array(zod.string()).length(4),
    rightAnswer: zod.number().min(0).max(3),
    startDate: zod.date({ message: "Invalid date string!" }),
    endDate: zod.date({ message: "Invalid date string!" }),
    
})



module.exports = createQuizSchema