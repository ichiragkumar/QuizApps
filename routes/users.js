const express = require("express")
const bcrypt = require('bcrypt');
const router = express.Router()
router.use(express.json())
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")

const User = require("../models/userdb")
const createAccountSchema = require("../controller/accountValidator")

// create user account 
router.post("/createUser", async (req, res)=>{
        const userDetails = req.body
        const parsedResult = createAccountSchema.safeParse(userDetails)
        if (parsedResult.success) {
                const user = await User.findOne({username:userDetails.username})
               
                if(!user){
                    try{
                        const saltRounds = 10
                        bcrypt.hash(userDetails.password, saltRounds,async function(err, hash) {
                        const dbUser = await User.create({
                            username:userDetails.username,
                            password:hash,
                        })
                        const userId = dbUser._id
                        const token = jwt.sign({
                            userId
                        }, JWT_SECRET);
                        res.status(201).json({token,msg:"created succesfully"})
                    })
                    }catch (error){
                        console.log(error)
                        res.status(411).json({msg:"Server Error"})

                    }
                }else{
                    res.status(200).json({msg:"Already Exist"})
                }
    
            }else{
                const error = parsedResult.error;
                console.log(error);
                res.status(403).json({msg:"Invalid Input"})
        }
})



router.post("/loginUser", async (req, res)=>{
    const userDetails = req.body
    const parsedResult = createAccountSchema.safeParse(userDetails)

    if (parsedResult.success) {
        const user = await User.findOne({username:userDetails.username})
        if(user){   
            try{
                bcrypt.compare(userDetails.password, user.password,async (err, result) => {
                   if(result){
                        const token = jwt.sign({
                            userId: user._id
                        },JWT_SECRET)
                        res.status(200).json({token,msg:"Login Succesfully"})
                   }else{
                        res.status(200).json({msg:"Invalid Password"})
                   }

                })
               
            }catch (error){
                console.log(error)
                res.status(411).json({msg:"Server Error"})

            }
        }else{
            res.status(403).json({msg:"User Does  not Exist"})
        }
        }else{
            const error = parsedResult.error;
            console.log(error);
            res.status(403).json({msg:"Invalid Input"})
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
