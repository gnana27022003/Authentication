const {generateToken} = require('./jwttoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const verifyUserData = async(req,res)=>{
    if(req.body.email && req.body.password){
        const user = await User.findOne({email:req.body.email})
        if(user){
            if(req.body.password === user.password){
                const token = await generateToken(user);
                /*res.json({
                    "success": true,
                    "token":token,
                    "user":{
                        _id:user._id,
                        email:user.email
                    }
                })*/
               res.redirect('/home')
            }else{
                res.json({
                    "success":false,
                })
            }

        }else{
            console.log('please enter email & password')
            res.redirect('/')
        }
    }
}

module.exports={verifyUserData}