import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState,setCurrentState]=useState('login');
  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)

  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')


  const onSubmitHandler= async (event)=>{
    event.preventDefault();


    // now we will call the api 
    try {

      if(currentState=== 'Sign Up'){//then we will cal the sign up  API 
        const response =await axios.post(backendUrl + '/api/user/register',{name,email,password})


        //by executing above statement will give us the token  

        if(response.data.success){
          setToken(response.data.token)//stored token in the shopcontext for the  user signup  

          // now we will store this token into the localstorage similiar to the admin 
          localStorage.setItem('token',response.data.token)
        }
        else{
            toast.error(response.data.message)
        }

      }
      else{
        // here we will call the login api 
        const response=await axios.post(backendUrl+ '/api/user/login',{email,password})

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }



  //now when we will have the login or signup then thetoken will be stored in the localstorage so we want that when token is updated from the user during signup or login then we should redirect-----to home page----
  useEffect(()=>{
    if(token){
      navigate('/')

    }

  },[token])


  return (

    <form  onSubmit={(e)=>onSubmitHandler(e)}   className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 ' action="">
      <div className=' inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr  className=' border-none h-[1.5px] w-8 bg-gray-800 '/>
      </div>

      {/* we want the name field when creating the new account not on the login time so for that we will use ternary operator to only sho on sign Up time   */}

       {currentState==='Login'?'':<input required className='w-full px-3 py-2 border border-gray-800' placeholder='Name' type="text" name="" id=""  onChange={(e)=>setName(e.target.value)} value={name}/>}
      <input required className='w-full px-3 py-2 border border-gray-800' placeholder='Email' type="email" name="" id=""  onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input required className='w-full px-3 py-2 border border-gray-800' placeholder='Password' type="password" name="" id="" onChange={(e)=>setPassword(e.target.value)} value={password} />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState==='Login'
          ?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>:
          <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'?'Sign In':'Sign Up'}</button>





    </form>



  )
}

export default Login