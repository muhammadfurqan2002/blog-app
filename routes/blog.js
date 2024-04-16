const express=require('express');
const multer=require('multer');
const path=require('path');
const {blogModel}=require('../models/blog');
const blogRoute=express.Router();
const {userModel}=require('../models/user');
const { commentModel } = require('../models/comment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
      const fileName=`${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage })
  


blogRoute.get('/add-blog',(req,res)=>{
    return res.render("blog",{
      user:req.user
    });
});


blogRoute.post("/comment/:blogId",async(req,res)=>{
              await commentModel.create({
                content:req.body.content,
                blogId: req.params.blogId,
                createdBy:req.user._id
              });
              return res.redirect(`/blog/${req.params.blogId}`);
});

blogRoute.get('/:id',async(req,res)=>{
    const blog=await blogModel.findById(req.params.id).populate("createdBy");
    const comment=await commentModel.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog_view",{
      item:blog,
      user:req.user,
      createdBy:blog.createdBy,
      comments:comment
    });
});


blogRoute.post('/',upload.single('coverImageURL'),async(req,res)=>{
    
    const {body,title}=req.body;
    
    const blog=await blogModel.create({
            title,
            body,
            coverImageURL:`/uploads/${req.file.filename}`,
            createdBy:req.user._id,
    });
    return res.redirect('/');
});





module.exports={
    blogRoute,
}
