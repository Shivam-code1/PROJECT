import mongoose from 'mongoose';


//it is arrow function for connceting the database to the mongodb
const connectDb= async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("DB connected");
    })
    // console.log("DB ");

    // it will create the collection of e-commerce in the mongodb atlas
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)

}

export default connectDb
