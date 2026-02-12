const express = require('express');
const router = express.Router();
const{storeUserData} = require('../controllers/storeUserData')
const {authMiddleware} = require('../middleware/authMiddleware')

router.get('/signup',async(req,res)=>{
    res.render('signup',{
        message: ""
    })
})

router.post('/signup',async(req,res)=>{
    const result = await storeUserData(req,res)
    if(result.success){
        res.json({
           "success":true,
            "message":"signup successful"
        })
    }
    else{
         res.json({
           "success":false,
            "message":"signup failed"
        })
    }
})


router.get('/home',authMiddleware,async(req,res)=>{
    res.render('home')
})


module.exports = router