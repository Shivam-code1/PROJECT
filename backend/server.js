import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app=express()
const port=process.env.PORT || 4040
connectDb()
connectCloudinary()


// middleware
app.use(express.json())
app.use(cors())






// api endpoints
app.use('/api/user',userRouter)//it is for the user 
app.use('/api/product',productRouter)//it is for the product
app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter)//it is for the order for the user and admin 


app.get('/',(req,res)=>{
    res.send("Api working")
})


app.listen(port,()=>console.log('server started at port:'+ port))