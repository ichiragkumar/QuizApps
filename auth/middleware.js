const JWT_SECRET  = require("../config");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({msg:"No Bearer Token"});
    }else{
        const token = authHeader.split(" ")[1]
        try {
            const decodedJWTsecret = jwt.verify(token, JWT_SECRET);
            if(decodedJWTsecret.userId){
                req.userId = decodedJWTsecret.userId;
                next();
            }else{
                res.status(403).json({});
    
            }
        } catch (error) {
            console.log(error)
            res.status(403).json({});
            
        }
    }

}

module.exports = authMiddleware
