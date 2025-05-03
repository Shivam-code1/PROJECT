// in this we are creating this for when user is loggedin then the orders that are selected should be store in the  database for that we will write 4 functions for that

import userModel from "../models/userModel.js"




// add product to user cart
const addToCart=async (req,res)=>{

    try {
        const {userId,itemId,size}=req.body

        const userData =await userModel.findById(userId)
        const cartData=await userData.cartData


        if(cartData[itemId]){

            if(cartData[itemId][size]){
                
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1
            }

        }

        else{

            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        // now we have add the item into the cart now update the cart 
        
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Added to the cart "})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
        
        
    }

}



// update user cart
const updateCart=async (req,res)=>{


    try {
        const {userId,itemId,size,quantity}=req.body
        
        const userData =await userModel.findById(userId)
        const cartData=await userData.cartData

        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:"Update to the cart "})



    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
        
    }
}



// get user cart data
const getUserCart=async (req,res)=>{

    try {
        const {userId}= req.body

        const userData =await userModel.findById(userId)
        const cartData=await userData.cartData

        res.json({success:true,cartData})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
    }
}
 

export {addToCart,getUserCart,updateCart}


