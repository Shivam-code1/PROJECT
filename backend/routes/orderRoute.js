import express from 'express'
import {allOrders,updateStatus,placeOrder,placeOrderRazorpay,placeOrderStripe,userOrders, verifyStripe,} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminauth.js'
import authUser from '../middleware/Auth.js'

const orderRouter=express.Router()



// Admin features
orderRouter.post('/list',adminAuth,allOrders)//it is admin functionality so require admin authentication
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)



// User Features
orderRouter.post('/userorders',authUser,userOrders)



// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)


export default orderRouter