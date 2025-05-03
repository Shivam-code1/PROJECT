// it is used to verifying the  images provided by the seller to be store in the database

import multer from 'multer'


const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})


// for working the middleware we have to set the below line storage that we have created for storage  
const upload=multer({storage})


export default upload