const {Schema,model}=require('mongoose');
const { error } = require('node:console');
const { createHmac, randomBytes } = require('node:crypto');
const { createTokenFromUser } = require('../services/authentication');
const userSchema=new Schema({

    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        required:true
    },
    proileImageURL:{
        type:String,
        default:"/images/user.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
});


userSchema.pre('save',function(next){
    const user=this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt=salt;
    this.password=hashPassword;

   next();
});



userSchema.static('verifyPassword',async function (email,password) {
    const user= await this.findOne({email});

    if(!user) throw new Error("User Not Found");

    const salt=user.salt;
    const userHashedPassword=user.password;
    
    const hashPassword = createHmac('sha256', salt).update(password).digest('hex');
  
        if(userHashedPassword!==hashPassword) throw new Error("Incorrect Password"); 


        const token=createTokenFromUser(user);
            return token;

});


const userModel=model("user",userSchema);

module.exports={
    userModel,
};