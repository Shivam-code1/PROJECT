import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
  
    const {currency}=useContext(ShopContext); 

    return (
     <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        {/* here overflow-hidden is added because if not then the image will grow in scale and will be seen out of the div when hover that is why with this image will remain in the div element  */}
        <div className=' overflow-hidden' >
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />

        </div>
        <p className='pt-3 pb-1 text-sm  ' >{name}</p>
        <p className='text-sm font-medium'>{currency}{price} </p>
     
     </Link>
  )
}

export default ProductItem