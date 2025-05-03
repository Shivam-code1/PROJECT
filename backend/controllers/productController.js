import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js'



// here we  will create -------4 functions------- for the product in the database  


// function for add product

// for adding/storing the images in the database we can not do that for doing this we have  to first store the image in the cloudinary then from that we will take  the url of the image and will store that in the database 

const addProduct =async (req,res)=>{
    try {
        
        const { name,description,price,category,subCategory,sizes,bestSeller}=req.body


        // in this we will take the images from the user -->and also we have add the  condition that the we did not send the image file but trying to access the file so to solve that problem we are using this condition and '&&' operator like this 
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]


        // now we will store this image in the cloudinary then tose image url will be stored in the database
        const images=[image1,image2,image3,image4].filter((item)=> item!=undefined)


        // now it is time to send this photos to the cloudinary
        let imageUrl=await  Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,
                    {resource_type:'image'});
                return result.secure_url
                

            })
        ) 


        // now we will store the  array of links into the product database of mongodb
        // here for storing the price as a number we have done 
        // for bestseller it will be given string from the form so convert that into boolean
        // for sizes we are giving the string in frontened  so convert it into array by using JSON.parse 
        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller==="true"?true:false,
            sizes: JSON.parse(sizes),
            image:imageUrl,
            date:Date.now()

        }


        // console.log(name,description,price,category,subCategory,sizes,bestSeller);
        // console.log(image1,image2,image3,image4);
        // console.log(imageUrl);

        console.log(productData)
        const product=new productModel(productData)
        await product.save()


        res.json({success:true,message:"product added"})
        
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
        
    }

}







// function for  list product
const listProduct =async (req,res)=>{
    try {
        
        const products=await productModel.find({})

        res.json({success:true,products})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
           
    }
}



// function for removing product
const removeProduct =async (req,res)=>{
    
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed succesfully"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



// function for single product info
const singleProduct =async (req,res)=>{
    try {
        const {productId}=req.body
        const product= await productModel.findById(productId) 
        res.json({success:true,product})



    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


export {addProduct,removeProduct,singleProduct,listProduct}
