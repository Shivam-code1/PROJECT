import express from 'express'

import {addProduct,removeProduct,singleProduct,listProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminauth.js'

const productRouter=express.Router()



// here we have import the adminAuth middleware for the admin api
productRouter.post('/add',adminAuth,upload.fields(
    [
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1}
    ]   
),addProduct)







productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProduct)


export default productRouter