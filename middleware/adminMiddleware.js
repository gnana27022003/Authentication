
const User = require('../models/user');

const adminMiddleware = async(req,res,next)=>{
    try{
        const user = await User.findOne({userId:req.userId})
        if(!user){
            res.json({
                "message":"User not found"
            })
        }
        if(user.role == 'admin'){
            next();
        }
        else{
            res.json({
                "message":"Access Denied, Admins Only!!"
            })
        }
    }
    catch(err){
       next(err)
    }
}

module.exports = {adminMiddleware}