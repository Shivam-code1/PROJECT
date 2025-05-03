import express from 'express'
import {loginUser,adminLogin,registerUser} from '../controllers/userController.js'


const userRouter=express.Router()


// now creating the routes for the user 

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)


export default userRouter;



