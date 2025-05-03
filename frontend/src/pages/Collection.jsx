import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets, products } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

    const { products,search,showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProduct, setFilterProducts] = useState([])
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [sortType,setSortType]=useState('relevant');
    

    // now we are making the arrow functions for the categor and subcategory 

    const togglecategory = (e) => {

        //in this we are checking the category options are present on the category array or not if no then add otherwise filter it 

        // oncheck it will add in array and on not change it will filter it  
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }


    }


    const toggleSubcategory = (e) => {

        //in this we are checking the category options are present on the category array or not if no then add otherwise filter it 

        // oncheck it will add in array and on not change it will filter it  
        if (subcategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }


    }


    //now we have all the category selection from category and subcategory and now we will apply filter

    const applyfilter=()=>{

        let productscopy=products.slice()



        if(showSearch && search){
            productscopy=productscopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()) )
        }

        //foe the category and subcategory selection that will show the items on the basis of category and subcategory 
        if(category.length > 0 ){
            productscopy=productscopy.filter(item=> category.includes(item.category))
        }

        if(subcategory.length>0){
            productscopy=productscopy.filter(item=> subcategory.includes(item.subCategory))
        }


        setFilterProducts(productscopy)
    }



    //and now we use useeffect for the changes done on the category and subcategory array if anything changes then we will run the filter function
    useEffect(()=>{
        applyfilter()
    },[category,subcategory,search,showSearch,products])


    //now we do not use this because logic is wriiten in the filter that if there is no option selected then it will show all the products

    // useEffect(() => {
    //     setFilterProducts(products)
    // }, [])







    // now we will apply function for the sort by value low,high 
    const sortProduct=()=>{
        let frcopy=filterProduct.slice();

        switch(sortType){
            case 'low-high':
                setFilterProducts(frcopy.sort((a,b)=>(a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(frcopy.sort((a,b)=>(b.price - a.price)));
                break;
            
            default:
                applyfilter();
                break;


        }
    }


    useEffect(()=>{
        sortProduct();
    },[sortType])










    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10  pt-10 border-t'>

            {/* filter Options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS
                    <img className={`h-3 sm:hidden %{showFilter? 'rotate-90' : '' }`} src={assets.dropdown_icon} alt="" />
                </p>


                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}  sm:block`}>
                    <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' value={'Men'} type="checkbox"  onChange={togglecategory} name="" id="" />Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' value={'Women'} type="checkbox" onChange={togglecategory} name="" id="" />Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' value={'Kids'} type="checkbox" onChange={togglecategory} name="" id="" />kids
                        </p>
                    </div>
                </div>





                {/* Sub Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}  sm:block`}>
                    <p className='mb-3 text-sm font-medium '>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' value={'Topwear'} type="checkbox" onChange={toggleSubcategory}  name="" id="" />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' value={'Bottomwear'} type="checkbox" onChange={toggleSubcategory} name="" id="" />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' value={'Winterwear'} type="checkbox"onChange={toggleSubcategory}  name="" id="" />Winterwear
                        </p>
                    </div>
                </div>

            </div>



            {/* Right Side */}
            <div className='flex-1'>


                <div className='flex justify-between text-base sm:tex-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTION'} />

                    {/* Product Sort */}
                    <select onChange={(e)=>setSortType(e.target.value)}className='border-2 border-gray-300' name="" id="">
                        <option value="relavent">Sort by: Relavent </option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>






                {/* Map Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6' >
                    {
                        filterProduct.map((item, index) => (

                            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

                        ))
                    }

                </div>







            </div>



        </div>


    )
}

export default Collection