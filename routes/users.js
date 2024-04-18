const express = require("express")

const router = express.Router()
router.use(express.json())

const User = require("../models/userdb")


// create user account 
router.post("/createUser", async (req, res)=>{
        // get user details
        // validate user details: ZOD
        const userDetails = req.body
        console.log(userDetails);

        const user = await User.create(userDetails)
        console.log(user);        
        

        // try to save in database
        // before saving password: dcrypt the password

        // and then give response: success

        res.status(201).json({
            msg:"user is created"
        })
})



router.post("/loginUser", async (req, res)=>{
    // get the details
    // validate the inputs using ZOD

    // try to find the user
    const userDetails = req.body
    const user = await User.findOne({
        username:req.body.username,
    })
    console.log(user);

    // then compare the dcrypt the password

    // if YES: then SUCCESS


    res.status(201).json({
        msg:"user login succesfully"
    })
})




router.delete("/delteAccount",async (req, res)=>{
    // get the user id
    // and delete his account

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
