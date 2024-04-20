const zod = require("zod")

// creating schema for createQuiz
const createUserAccountUserSchema = zod.object({
    username: zod.string().min(1).max(50),
    password: zod.string().min(6)
    
})







module.exports = createUserAccountUserSchema