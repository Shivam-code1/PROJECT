// import { currency } from '../../admin/src/App.jsx'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'



// 
// global variables
const currency ='inr'
const deliveryCharge=10


// Gateway initialize
import Stripe from 'stripe'

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)




// placing order using COD method
const placeOrder=async(req,res)=>{





    // Backend update has done in try catch from here 
    try {
        
        const {userId,items,amount,address}=req.body//userId comes from middleware from auth.js


        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }


        const newModel =new orderModel(orderData)
        await newModel.save()


        // now the  data is saved in database now CLEAR the cart data 
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placces"})





    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
        
    }







}



// placing order using Stripe method
const placeOrderStripe=async(req,res)=>{

    try {

        const {userId,items,amount,address}=req.body//userId comes from middleware from auth.js


        // origin means in header it will contain the  origin of the  frontened website
        const {origin} =req.headers

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }


        const newModel =new orderModel(orderData)
        await newModel.save()


        // now execute the stripe payment 
        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity

        }))


        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({

            success_url:`${origin}/verify?success=true&orderId=${newModel._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newModel._id}`,
            line_items,
            mode:'payment',

        })
        
        res.json({success:true,session_url:session.url})
    } catch (error) {
        

        res.json({success:false,message:error.message})
        console.log(error);  
    }


}




// verify Stripe
const verifyStripe =async (req,res)=>{

    const {orderId,success,userId}=req.body

    try {
        
        if(success=== "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            res.json({success:true})
        }
        else{

            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error); 
        
    }
}






// placing order using Razorpay method
const placeOrderRazorpay=async(req,res)=>{


    
}







// All orders data for admin panel
const allOrders=async(req,res)=>{
    
    try {
    
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
    }
    
    
}



// User order data for frontend 
const userOrders=async(req,res)=>{
    
    try {

        //userId will be obtain from middleware authUser from that id and token are present         
        const {userId}=req.body

        const orders =await orderModel.find({userId})

        res.json({success:true,orders})




    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
    }
    
}



// update order status from admin panel
const updateStatus=async(req,res)=>{

    try {
        
        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})


        res.json({success:true,message:"Status Updated"})
        


    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);   
    }
    
}



export {allOrders,updateStatus,placeOrder,placeOrderRazorpay,placeOrderStripe,userOrders,verifyStripe}