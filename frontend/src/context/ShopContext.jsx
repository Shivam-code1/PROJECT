import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";  removing this because we are connecting to the backend using api call
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'




export const ShopContext=createContext();




const ShopContextProvider=(props)=>{

    const currency='$';
    const delivery_fees=10;

    // for the backend to connect to the frontend 
    const backendUrl=import.meta.env.VITE_BACKEND_URL




    const [search,setSearch]=useState('');//for the searchbar content to use across componenets
    const [showSearch,setShowSearch]=useState(false);//for showing the serchbar on other pages 
    const [cartItems,setCartItems]=useState({});
    const navigate=useNavigate();
    const [products,setProducts]=useState([])

    // it is for the backend API call for he login functionality by taking token 
    const [token,setToken]=useState('')





    // How CartItems is look like in the storing  is like this 
    // cartItems={
    //          id-->aaaa:{ 'M':5}
    //          id-->aaab:{ 'S':3}
    // }




    // function for adding the  data of the product into the cart that can we use easily the data for purchasing the product 



    const addToCart= async (itemId,size)=>{

        // Now adding the condition for when the size is not available/or not add  in the cartItems object 

        if(!size){
            toast.error('Select Product Size')
        }

        let cartData=structuredClone(cartItems);//to making the copy of the cartItems

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;//if there is more products of same entry then increment that 

            }
            else{
                cartData[itemId][size]=1;//otherwise set to initial 1

            }
        }
        else{
            // if there is no entry then we will create the new entry for the cartdata 
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
        // console.log(cartItems)





        // now the cartData will be added by the frontend only by doing the above code now we will connect it to the backend so the updating in the cart sould be reflected on the cart also of the user  in backend 


        if(token){//if token is available means we are loggedin and now we  will call the backend api

            try {
                
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})


            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }

        }
    }


    // for dynamicaly identifying the cartItems has been selected for purchasing to update the cart products for purchase  
    const getCartCount=()=>{
        let totalCount=0;

        //now loop over the cartItems for determining the number of products has been selected 
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){//means it have been selected some products
                        totalCount+=cartItems[items][item];
                    }

                } catch (error) {
                    
                }
            }
        }

        return totalCount;
    }


    // for updating and deleting the card data from the cartItem and it updates the  top right cart icon also  
    const updateQuantity=async (itemId,size,quantity) =>{

        let cartData=structuredClone(cartItems)

        cartData[itemId][size]=quantity;
        setCartItems(cartData)







        // It means we are logged in 
        if(token){

            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})


            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }

        }



    }





    // for cart amount total 
    const getCartAmount=   ()=>{
        let totalAmount=0;

        for(const items in cartItems){//here items will be the id that is present in the cartItems 
            let itemInfo=products.find((product)=>product._id===items)

            for(const item in cartItems[items]){//now check in cartItems that the -Id have which items in it
                try {
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price * cartItems[items][item]
                    }

                } catch (error) {
                    console.log(error)
                    
                }

            }
        }
        return totalAmount
    }
        



    // for  connecting to the backend and grt the products from backend
    const getProductData=async ()=>{


        try {


            // we are doing the backend call on the list because we have added all the products from the list that is present in the admin for authentication then fetching those products from list using backend api
            const response=await axios.get(backendUrl + '/api/product/list')


            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    } 




    // function for when the page is reloded the cart data should be fetched from the  database and update the cart according to the amount of items present in the cart

    const getUserCart=async (token)=>{

        try {
            
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})

            if(response.data.success){
                // rceive the cart data 
                setCartItems(response.data.cartData) 
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }






    useEffect(()=>{
       getProductData() 
    },[])



    // this useeffect is for the when we are  loggedin if we refresh the page then the token is also remove from the localstorage so to prevent this from happening the the user should be loggedin even on refresh of the sites

    // means if token is available but in the localstorage the token is not available for that 
    useEffect(()=>{
        if(!token && localStorage.getItem('token') ){
            setToken(localStorage.getItem('token'))

            // will run with the first render and load the cart of th user from the database  
            getUserCart(localStorage.getItem('token'))
        }
    },[])




    const value={
        products,currency,delivery_fees,
        search,showSearch,setSearch,setShowSearch,
        cartItems,addToCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,navigate,
        backendUrl,token,setToken,

    }

    return (

        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>

    )
}

export default ShopContextProvider;



// we are doing thiws because we want to the all the products that are present on the assests folder that are objects we want them to be available to all the things in which we will use this shopcontext provider 