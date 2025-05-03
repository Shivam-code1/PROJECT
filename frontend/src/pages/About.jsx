import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets' 
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]  ' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovaton and a desire to revolutions.</p>
          <p>Since our inception,we've worked tirelessly to curate a diverse selection.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice,convenience.</p>
      </div>
    </div>

    <div className='text-4xl py-4'>
      <Title text1={'WHY'} text2={'COODE US'}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:py-16 py-8 sm:py-20 flex flex-col gap-5 '>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>We meticulously select and vet each product to ensure its meet our customer.</p>
      </div>
      <div className='border px-10 md:py-16 py-8 sm:py-20 flex flex-col gap-5 '>
        <b>Convenience:</b>
        <p className='text-gray-600'>With our user-friendly interface  and hassle-free ordering process,shopping becomes easier.</p>
      </div>
      
      <div className='border px-10 md:py-16 py-8 sm:py-20 flex flex-col gap-5 '>
        <b>Exceptional Customer Services:</b>
        <p className='text-gray-600'>Our team of dedicated professionnals is here to assist you the way,ensuring your needs.</p>
      </div>
    </div>

    <NewsletterBox/>






    </div>
    
  )
}

export default About