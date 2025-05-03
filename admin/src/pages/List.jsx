import React, { useEffect, useState } from 'react'
import {backenUrl, currency} from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'


// it is also require the token for the authentication so we have already taken as a props for dleting the products in the list  
const List = ({token}) => {

  const [list,setList]=useState([])

  const fetchList=async ()=>{

    try {
      const response=await axios.get(backenUrl + '/api/product/list')

      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message)
      }
        



    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  } 


  const removeProduct=async (id)=>{

    try {
      

      // remove is also one of admin feature so we have to give the token in the headers  for the authentification
      const response= await axios.post(backenUrl + '/api/product/remove' ,{id},{headers:{token}}) 

      if(response.data.success){
        toast.success(response.data.message)
        
        // now we have deleted the item from products by the backend call now we have to update the list now
        await fetchList();
      }
      else{

        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }


  }


  useEffect(()=>{
    fetchList()
  },[])
  
  return (
    <>
      <p className='mb-2'>All Products List </p>
      <div className='flex flex-col gap-2'>
        {/* -----------List table title------------ */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>




        {/* ------------Product List------------ */}
        {
          list.map((item,index)=>{
            return (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p >{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p  onClick={()=>removeProduct(item._id)} className='text-right  md:text-center cursor-pointer text-lg'>X</p>

            </div>
         ) })

        }
      </div>
    </>
  )
}

export default List