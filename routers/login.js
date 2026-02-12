const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { verifyUserData } = require('../controllers/verifyUserData');
const { authMiddleware } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');
const { errorMiddleware } = require('../middleware/errorMiddleware');


router.get('/',async(req,res)=>{
    res.render('login')
})

router.post('/',async(req,res)=>{
    const result = await verifyUserData(req,res);
})

router.get('/api/auth/profile',authMiddleware,async(req,res)=>{
    const userId = req.userId
    const user = await User.findOne({userId:userId})

    if(user){
       /* res.json({
            "User ID":user.userId,
            "name":user.name,
            "email":user.email,
            "role":user.role
        })*/
        res.render('profile',{user})
    }
    else{
        res.json({
            "message":"User not found"
        })
    }
   
})


router.get('/api/admin/dashboard',authMiddleware,adminMiddleware,async(req,res)=>{
    const user = await User.findOne({userId:req.userId})
    res.render('adminDashboard',{user})
})

module.exports = router
