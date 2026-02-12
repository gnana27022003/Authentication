const User = require('../models/user')
const {v4:uuidv4} = require('uuid')

const storeUserData = async(req,res)=>{
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
        return {success:true}
        
    }catch(error){
        console.log("user registration failed",error)
         return {success:false}
    }

}

module.exports = {storeUserData}