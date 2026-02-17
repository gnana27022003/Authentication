const {generateToken} = require('./jwttoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const verifyUserData = async(req,res)=>{
    if(req.body.email && req.body.password){
        const user = await User.findOne({email:req.body.email})
        if(user){
            if(req.body.password === user.password){
                const token = await generateToken(user);
                res.json({
                    "success": true,
                    "token":token,
                    "user":{
                        userId:user.userId,
                        email:user.email
                    }
                })
            }else{
                res.json({
                    "success":false,
                    "message":"Invalid password"
                })
            }

        }
        else{
            res.json({
                "success":false,
                "message":"Invalid user please try again"
            })
        }
    }else{
        res.json({
                "success":false,
                "message":"Please enter email and password"
            })
    }
}

module.exports={verifyUserData}