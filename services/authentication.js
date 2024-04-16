const jwt=require('jsonwebtoken');

const secretKey="m.furqan2002@icloud"

function createTokenFromUser(user){
    const payLoad={
        _id:user._id,
        email:user.email,
        proileImageURL:user.proileImageURL,
        role:user.role
    }
    return jwt.sign(payLoad,secretKey);
}



function verifyToken(token){
    return jwt.verify(token,secretKey);
}


module.exports={
    createTokenFromUser,
    verifyToken,
}