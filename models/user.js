const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userId:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    name:{type:String,required:true},
    role:{type:String,enum:["user","admin"],default:"user"}
}) 

module.exports = mongoose.model('userform',user)