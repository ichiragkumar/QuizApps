const express = require("express")
const router = express.Router()



// create user account 
router.post("/createUser", (req, res)=>{
        // get user details
        // validate user details: ZOD
    


        // try to save in database
        // before saving password: dcrypt the password

        // and then give response: success

        res.status(201).json({
            msg:"user is created"
        })
})



router.post("/loginUser", (req, res)=>{
    // get the details
    // validate the inputs using ZOD

    // try to find the user
    // then compare the dcrypt the password

    // if YES: then SUCCESS
    res.status(201).json({
        msg:"user login succesfully"
    })
})




router.delete("/delteAccount",(req, res)=>{
    // get the user id
    // and delete his account

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
