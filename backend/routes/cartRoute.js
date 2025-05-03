import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/Auth.js'



const cartRouter=express.Router()


// now in all this will going to api then the middleware auth will run by that it verify the token and will give the id then the other  function will run present in the cartcontroller 



// authUser is middleware which is automatically adding the id to the req.body

cartRouter.post('/get', authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)


export default cartRouter


