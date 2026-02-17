const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { verifyUserData } = require('../controllers/verifyUserData');
const { authMiddleware } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');
const { errorMiddleware } = require('../middleware/errorMiddleware');
const{storeUserData} = require('../controllers/storeUserData')


router.get('/',async(req,res)=>{
    res.json({
        "message":"Login to get access"
    })
})

router.post('/',async(req,res)=>{
   await verifyUserData(req,res);
})


router.get('/signup',async(req,res)=>{
    res.json({
        "message":"Signup to get access"
    })
})

router.post('/signup',async(req,res)=>{
    await storeUserData(req,res)
   
})


router.get('/home',authMiddleware,async(req,res)=>{
   res.json({
    "success":true,
    "message":"Welcome Home!!"
   })
})


router.get('/api/auth/profile',authMiddleware,async(req,res)=>{
    const userId = req.userId
    const user = await User.findOne({userId:userId})

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
            "success":false,
            "message":"User not found"
        })
    }
   
})


router.get('/api/admin/dashboard',authMiddleware,adminMiddleware,async(req,res)=>{
    const user = await User.findOne({userId:req.userId})
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
            "success":false,
            "message":"User not found"
        })
    }
})

module.exports = router
