const express =require('express');
const {veryfyToken} = require("../middlewer/userToken.js");
const {signUp,Login,userProfile,changePassword}=require('../Contoller/user.contoller.js');
const userRoutes =express.Router();

userRoutes.post('/register',signUp);
userRoutes.post('/login',Login);
userRoutes.get('/me',veryfyToken,userProfile)
userRoutes.put('/change-password',veryfyToken,changePassword)


module.exports=userRoutes;