// we will use this middleware when user have givn the crendentials  

import jwt from 'jsonwebtoken'

const authUser = async (req,res,next)=>{

    const {token}= req.headers;

    
    if(!token){
        return res.json({success:false,message:"Not authorized Login  Again"})
    }


    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)



// when creating token using JWT we have also give the id to the token in the userController for creating the token so we are taking id from that token now 

// now this is a middleware that will identify the request before going further by taking the token and giving the --------------res.body.userId=tokenid---------in body it is appending the id 




// id will be automatically provided by the  jwt from the userControler while creating the token and will be given to all routes by this middleware
        req.body.userId=token_decode.id
        next()


    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
    }


}


export default authUser