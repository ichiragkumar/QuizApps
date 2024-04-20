const express = require("express")

const router = express.Router()
router.use(express.json())

const User = require("../models/userdb")
const createAccountSchema = require("../controller/accountValidator")


// create user account 
router.post("/createUser", async (req, res)=>{
        const userDetails = req.body
        const parsedResult = createAccountSchema.safeParse(userDetails)
        if (parsedResult.success) {
            try {
                const user = await User.create(userDetails)
                res.status(201).json({user,msg:"created succesfully"})
            } catch (error) {
                console.log(`Database Error ${error}`)
                res.status(411).json({msg:"Database Error"})
            }
        }else {
        const error = parsedResult.error;
        console.log(error);
        res.status(201).json({msg:"Invalid Input"})
    }
})



router.post("/loginUser", async (req, res)=>{
    const userDetails = req.body
    const parsedResult = createAccountSchema.safeParse(userDetails)
    if (parsedResult.success) {
        try {
            const user = await User.findOne({
                username:req.body.username,
                password:req.body.password
            })
            res.status(201).json({user,msg:"User Found"})
        } catch (error) {
            console.log(`Database Error ${error}`)
            res.status(411).json({msg:"Database Error"})
        }
    }else {
        const error = parsedResult.error;
        console.log(error);
        res.status(201).json({msg:"Invalid Input"})
    }
    
})




router.delete("/delteAccount",async (req, res)=>{
    const userDetails = req.body
    const user = await User.deleteOne({
        username:req.body.username
    })
    console.log(user);

    res.status(201).json({
        msg:"Acccount deleted succesfully"
    })

} )




router.get("/", (req, res)=>{
    res.status(201).json({
        msg:"All users"
    })
})

module.exports = router
