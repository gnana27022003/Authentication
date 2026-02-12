const express = require('express');
const router = express.Router();
const{storeUserData} = require('../controllers/storeUserData')


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
           "success":true,
            "message":"signup failed"
        })
    }
})



module.exports = router