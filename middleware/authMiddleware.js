const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../controllers/jwttoken");

const authMiddleware = async(req,res,next)=>{
    const authheader = req.headers.authorization;
    if(authheader){
        const harray = authheader.split(' ');
        const token = harray[1];
        const res = verifyToken(token)
        if(res){
            next();
        }
        else{
            res.json({
                "message":"invalid TOKEN please try again"
            })
        }
    }
    else{
        res.json({
            "message":"Authentication token is required"
        })
    }
}

module.exports={authMiddleware}