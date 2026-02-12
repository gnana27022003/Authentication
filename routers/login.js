const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { verifyUserData } = require('../controllers/verifyUserData');
const { authMiddleware } = require('../middleware/authMiddleware');


router.get('/',async(req,res)=>{
    res.render('login')
})

router.post('/',async(req,res)=>{
    const result = await verifyUserData(req,res);
})

router.get('/api/auth/profile',authMiddleware,async(req,res)=>{
    const userId = req.userId
    const user = await User.findOne({userId:userId})
    console.log("user================================================================>",user)
    if(user){
        res.json({
            "User ID":user.userId,
            "name":user.name,
            "email":user.email,
            "role":user.role
        })
    }
    else{
        res.json({
            "message":"User not found"
        })
    }
})

module.exports = router
