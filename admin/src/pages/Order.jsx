import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backenUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Order = ({ token }) => {


  const [orders, setOrders] = useState([])



  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backenUrl + '/api/order/list', {}, { headers: { token } })
      // console.log(response.data)

      if (response.data.success) {
        setOrders(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }



  // function for handling the  order placed in the admin panel so it will update the user frontend also

  const statusHandler=async (event,orderId)=>{

    try {
      const response=await axios.post(backenUrl + '/api/order/status' ,{orderId,status:event.target.value},{headers:{token}}) 

      if(response.data.success){
        await fetchAllOrders()
      }



    } catch (error) {


      toast.error(error.message)
      console.log(error) 
    }

  }




  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (

    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>


                <div>
                  {order.items.map((item, index) => {

                    if (index === order.items.length - 1) {//means the item is the last item 
                      return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size} </span> </p>
                    }
                    else {//for other items 


                      return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size} </span>, </p>

                    }
                  })}
                </div>
                <p className=' mt-3 mb-2 font-medium '  >{order.address.firstName + " " + order.address.lastName} </p>
                <div>
                  <p>{order.address.street + ","} </p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode} </p>

                </div>
                <p>{order.address.phone} </p>
              </div>

              <div>
                <p className='text-sm sm:tect-[15px]  '>Items: {order.items.length } </p>
                <p className='mt-3  '>Method: {order.paymentMethod } </p>
                <p>Payment: {order.payment ? 'Done':'Pending' } </p>
                <p>Date: {new Date(order.date).toLocaleDateString() } </p>
              </div>


              <p className='text-sm sm:text-[15px]  '>{currency}{order.amount} </p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='font=semibold p-2  '>

                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delievered">Delievered</option>
              </select>
            </div>

          ))
        }
      </div>



    </div>
  )
}

export default Order