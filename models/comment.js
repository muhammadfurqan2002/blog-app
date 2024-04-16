const { default: mongoose } = require('mongoose');
const mogoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
       require:false
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog",
    },
    createdBy:{
        type:mogoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true});


const commentModel=mogoose.model("comment",commentSchema);


module.exports={
    commentModel,
}