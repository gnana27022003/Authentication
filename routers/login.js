const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { verifyUserData } = require('../controllers/verifyUserData');


router.get('/',async(req,res)=>{
    res.render('login')
})

router.post('/',async(req,res)=>{
    await verifyUserData(req,res);
})


module.exports = router
