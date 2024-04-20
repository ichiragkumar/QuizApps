const JWT_SECRET  = require("../config");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log("1st 403");
        return res.status(403).json({msg:"No Bearer Token"});
    }else{
        const token = authHeader.split(" ")[1]
        try {
            const decodedJWTsecret = jwt.verify(token, JWT_SECRET);
            if(decodedJWTsecret.userId){
                req.userId = decodedJWTsecret.userId;
                console.log(req.userId);
                console.log("going to req body");
                next();
            }else{
                console.log("2nd 403");
            return res.status(403).json({});
    
            }
        } catch (error) {
            console.log("3 rd : 403");
            return res.status(403).json({});
            
        }
    }


}

module.exports = authMiddleware
