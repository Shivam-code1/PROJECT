import mongoose from 'mongoose'



// In this we are creating the model of the product that how the product will be store in the database 


// Schema has created
const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },

    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestSeller:{
        type:Boolean,
    },
    date:{
        type:Number,
        required:true
    },
    
    
})


// now model will becreated from the schema
// this model will be created multiple times for solving that problem taht the model should not create multiple times we will use OR operator like this if model is presen already then use that otherwise create neww model
const productModel =  mongoose.model.product || mongoose.model("product",productSchema)

export default productModel

