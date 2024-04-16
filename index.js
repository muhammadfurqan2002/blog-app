const moongoose=require('mongoose');
const express=require('express');
const {userRoute}=require('./routes/user');
const cookieParser=require('cookie-parser');
const path=require('path');
const { checkAuthenticationCookie } = require('./middlewares/authentication');
const {blogRoute}=require('./routes/blog');
const {blogModel}=require('./models/blog');
const app=express();


const PORT=8080;
moongoose.connect("mongodb://127.0.0.1:27017/blogify").then(()=>{
                console.log("db-connected");
}).catch((error)=>{
        console.log(error);
});

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));

app.use('/user',userRoute);

app.use('/blog',blogRoute);

app.use(express.static(path.resolve('./public')));

app.get("/",async(req,res)=>{
        const blogs=await blogModel.find({});
        res.render("home",{
               user:req.user,
               blog:blogs
        });
});





app.listen(PORT,()=>{
        console.log(`Server started at port :${PORT}`);
});


