import React, { useState } from 'react'
import axios from 'axios'
import { backenUrl } from '../App'
import { toast } from 'react-toastify'

export const Login = ({setToken}) => {


    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


    const onSubmitHandler=async (e)=>{
        try {
            e.preventDefault()
            
            // now we will perform the  backend call(API call) to check the admin credentials are valid or not 
            const response =await  axios.post(backenUrl + '/api/user/admin',{email,password}) 

            // go below to check the response outcocme on terminal what was it
            // console.log(response);


            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }



        } catch (error) {
            console.log(error)
            toast.error(response.data.message)


        }

    }

  return (
    <div className='min-h-screen flex items-center justify-center  w-full '>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md '>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler} action="">

                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@gmail.com' required />
                </div>

                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                </div>

                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>
            </form>

        </div>

    </div>
  )
}


// {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
// config
// : 
// {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
// : 
// {success: true, token: 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ21haWwuY29tMTIzNDU2.opaBMsTT31GNMSw84c3WXxKpg1fIp7JaljKlPEPy8-U'}
// headers
// : 
// AxiosHeaders {content-length: '120', content-type: 'application/json; charset=utf-8'}
// request
// : 
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status
// : 
// 200
// statusText
// : 
// "OK"