// in this we will write the logic for the user to create an account and login the user 

import userModel from '../models/userModel.js';
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}




// routes for user login 
const loginUser= async (req,res)=>{


    try {
        
        const {email,password}=req.body;

        // now we will find the user exist in the  database that the user is trying to be LogIn
        const user= await userModel.findOne({email});
        
        if(!user){
            return res.json({success:false,message:"user doesn't exist"})
        }


        // here  the email is provided by user exist and then password will be checked  that given from the user to the database of the user password of that matching email that it exist or not 
        const isMatch=await bcrypt.compare(password,user.password);

        // it means the isMatch will be true or false according 
        if(isMatch){
            const token=createToken(user._id)
            res.json({success:true,token})
            
        }
        else{// it means user email is correct but trying to login with incorrect password 
            res.json({success:false,message:"Invalid  Credentials"})
        }
    } catch (error) {
    
        console.log(error)
        res.json({success:false,message:error.message})


    }
}
            
        










// routes for user registration

const registerUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body;


        // checking user already exist or not 
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exist"})
        }

        // above condition is not executed then this will executes
        // validating email format and strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter valid  email"})
             
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password "})
        }

        // if all the above  condition is satisfied then account will be created with ***encrypted password*** 

        // hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)


        // now we have the user name,email and hashedpassword for security now we will store it 

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword

        })

        const user=await newUser.save()

        const token=createToken(user._id)

        res.json({success:true,token})

        


    } catch (error) {
        
        console.log(error)
        res.json({success:false,message:error.message})
    }

}





// route for admin login in this it will provide  the security for the api that the product items can only be added by the admin authority bu havind add,delete,list and single these routes only work for the admin 

const adminLogin= async (req,res)=>{
    
    try {
        const {email,password}=req.body

        // if verify it means that it is really admin so we  will give a ----TOKEN--- for login to admin to access
        
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){


            // by this token it will encrypt the email and password and will create the token for the admin 
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})

        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



export {loginUser,registerUser,adminLogin}