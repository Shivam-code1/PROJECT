import jwt from 'jsonwebtoken'


// this file is created for the authentication of the api where we need the admin permission like add,delete,list,single of these api we need admin credentials or permission for accesing these api so 

// this file will act as a middleware for that when accessing those api this middleware will run and check for the admin access that the user have or not 




// it is a middleware so we are using req,res and next in this because of themiddleware

const adminAuth=async (req,res,next)=>{

    try {
        
        // now we will check the verification of the  token provided by the user we have made the token by using "email+password" by using jwt_secret from .env
    
    
        const {token} = req.headers// it will be provided when the user enters the admin email and password it will go in the header
    
    
        // now check the token from the user is given or not  
        if(!token){
    
            // in this we  are using return keyword so that the async function should terminate here and dont execute for the further code in this block 
            return res.json({Success:false,message:"Not Authorized Login Again"}) 
        }
    
        // from above the token is present now verify the token from the user that consist email and password of the user that it mathches with thee admin or not by decoding thr  token
    
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    
        // now the token is decoded into the "String" fromat now check 
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
    
            // here we do same return from here if the verification is failed 
            return res.json({Success:false,message:"Not Authorized Login Again"}) 
        }
    
    
        // now if it pass from above that means it is correct not pass the middleware to the api
        next()
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


export default adminAuth
