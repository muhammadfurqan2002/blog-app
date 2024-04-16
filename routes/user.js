const express=require('express');
const {userModel}=require('../models/user');
const userRoute=express.Router();


userRoute.get("/signup",(req,res)=>{
    return res.render('signup');
});
userRoute.get("/signin",(req,res)=>{
   return res.render('signin');
});

userRoute.post("/signup",async(req,res)=>{
    const {email,fullName,password}=req.body;
    await userModel.create({
            email,
            password,
            fullName,
    });
    res.redirect('/');
});

userRoute.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    // console.log(email,password);

    try{
        const token= await userModel.verifyPassword(email,password);
       return res.cookie("token",token).redirect('/');
    
    }catch(e){
            return res.render("signin",{
               error:"Incorrect Email or Password" 
            });
    }
});


module.exports={
    userRoute,
}

