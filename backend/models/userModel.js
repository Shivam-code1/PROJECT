import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{},
    },

},{minimize:false})


// we have done the minimize property false becuase in mongoose when we will create a new user and in that usercart it should show empty object {} that is ehat we want 

// to achieve this we have to give this property minimize so that mongoose normally neglect the data that are given as empty in here it is object so to solve this mongoose should not neglect the empty object{} we have give this property 



const userModel=mongoose.model.user || mongoose.model('user',userSchema)

export default userModel