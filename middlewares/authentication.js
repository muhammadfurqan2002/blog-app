const {verifyToken}=require('../services/authentication');

function checkAuthenticationCookie(tokenName){
    return (req,res,next)=>{
        const tokenCookie=req.cookies[tokenName];
        console.log(tokenCookie);
        if(!tokenCookie){
            return next();
        }

        try{
            const payLoad=verifyToken(tokenCookie);
            req.user=payLoad;
        }catch(e){}
        next();
    }
}



module.exports={
    checkAuthenticationCookie,
}