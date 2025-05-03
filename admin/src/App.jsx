import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { Login } from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// here we will authenticate the admin credentials so we use backenUrl(consist backendurl ) present in .env then we  will export this so we  can use  it anywhere 

// for use things in all over the backend export from app.jsx it is different from the frontend
export const backenUrl=import.meta.env.VITE_BACKEND_URL
export const currency='$'

// now for authenticating that the admin has been logged  in we have  to check that only then the admin portal will show otherwise the login route will be shown

const App = () => {

  
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  // now when we give the correct admin credentials then it will be checked on the backened by using axios api calls then the token will be given but ----when reload the page then we have to enter the admin credentials again to solve that we are using localstorage--------------

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])





  return (
    <div className='bg-gray-50 min-h-screen'>



    <ToastContainer/>

{/* now by this we will authenticate the admin for getting the token we have created a component login.jsx from that we are using axios to make the backened api call then from that we are taking the token  */}
        {token===''?
        <Login setToken={setToken}/>:
        
        
      <>
        <Navbar setToken={setToken}/>
        <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base '>


        <Routes>
          <Route path='/add' element={<Add token={token} />} />
          <Route path='/list' element={<List  token={token}/>} />
          <Route path='/orders' element={<Order token={token}/>} />

        </Routes>


        </div>

      </div>
      </>  
    }
    </div>
  )
}

export default App