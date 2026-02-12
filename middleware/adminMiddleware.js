const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminMiddleware = async(req,res,next)=>{
    const user = await User.findOne({userId:req.userId})
    if(user.role == 'admin'){
        next();
    }
    else{
        res.json({
            "message":"Users not Allowed only Admins can access"
        })
    }
}

module.exports = {adminMiddleware}