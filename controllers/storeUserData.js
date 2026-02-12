const User = require('../models/user')


const storeUserData = async(req,res)=>{
    const data = {
        email: req.body.email,
        password: req.body.password
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