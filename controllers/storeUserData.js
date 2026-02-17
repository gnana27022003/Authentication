const User = require('../models/user')
const {v4:uuidv4} = require('uuid')
  

const storeUserData = async(req,res)=>{
    if(req.body.name && req.body.email && req.body.password){
        const user = await User.findOne({email:req.body.email})
        if(!user){
            const data = {
                userId:uuidv4(),
                email: req.body.email,
                password: req.body.password,
                name:req.body.name,
                role:req.body.role

            }
            try{
                await User.create(data)
                console.log("user registered")
                res.json ({
                    "success":true,
                    "message":"User registration successful"        
                })
                
            }catch(error){
                console.log("user registration failed",error)
                res.json({
                    "success":false,
                    "message":"user registration failed"
                })
                
                
            }
        }
        else{
            res.json({
                "success":false,
                "message":"User already exists with same email!!"
            })
        }
    }
    else{
        res.json( {
                "success":false,
                "message":"Please fillout all the fields(name,email,password,role(if admin)"        
            })
    }

}

module.exports = {storeUserData}