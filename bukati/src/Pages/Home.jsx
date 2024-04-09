import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

export default function Home() {
const [data, setData]=useState([])
useEffect(()=>{
axios.get('http://localhost:5300/api/product').then(res=>{
 setData(res.data)
  console.log(res.data)}).catch(err=>console.log(err))
},[])
     const handleSelectFood = (foodItem) => {
    setSelectedFood(foodItem);
  };
  return (
  <div className=' flex-col  items-center justify-center  h-[100%] flex pt-20'>
    <div className='items-center justify-center'>
    <div className='grid grid-cols-2 items-center justify-center'>
        <div className='flex-col gap-8 flex'><p className='text-5xl'>Premium <span className='text-[#FC8019]'>quality</span></p><div className='flex-row flex items-center gap-2'><p className='text-5xl'>Food for your</p><div className='w-[82.5px] h-[57.5px] bg-[#FFEDD0] rounded-2xl items-center justify-center flex'> <img src='apple.svg' className='w-[50px] '/></div><div><p className='text-4xl text-[#FC8019]'>healthy</p></div>
        </div>
      <div className='flex-row flex items-center  gap-2'>  <div className='w-[82.5px] h-[57.5px]  bg-[#FFD0D0] rounded-2xl items-center justify-center flex'> <img src='bananna.svg' className='w-[45px] '/></div><p className='text-4xl text-[#FC8019]'>& Daily Life</p><div></div>
      </div><p className='w-[400px] text-[10px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
       <div className='flex-row flex gap-3'>
        <a href='#food'><div className='bg-[#A088C6] w-[110px] h-[50px] text-white items-center justify-center flex rounded-lg shadow-xl'><button>Get Started</button></div></a>
      <Link to='/Feedback'> <div className='bg-[#A088C6] w-[110px] h-[50px] text-white items-center justify-center flex rounded-lg shadow-xl'><button>Feedback</button></div></Link></div>
        </div>
        <div className='flex-row flex gap-10 items-center justify-center'><img src='homepageimage.jpg' className='w-[330px] h-[450px] rounded-xl'/>
        <img src='image2.png' className=' w-[230px] h-[400px]'/></div>
    </div>
    
    </div><div id='food'>
    <p id='food' className='py-5 text-2xl text-center font-bold'>Recommended Food Items</p>
    <div className='grid grid-cols-4 gap-10 py-5 pb-20'>
  {data.map((item, index) => (
    <div key={index} className='flex flex-col items-center'>
      <Link to={`/order/${item.id}`} className='flex flex-col items-center'>
        <img src={item.imageUrl} className='w-48 h-48 rounded-xl' alt={item.name} />
        <p className='text-center text-sm mt-2'>{item.name}</p>
      </Link>
    </div>
  ))}
</div>

    </div>

<div className='pb-10 w-full'>
<div className=' items-center justify-center flex-col flex  bg-[#A088C6]  h-[300px]'>
    <div className='items-center justify-evenly  flex-row  flex w-[1500px] text-white'>
        <div className='flex-col flex items-center justify-center w-[400px] gap-3'><div className='bg-[#fff] w-[85px] rounded-full h-[85px] flex-col flex items-center justify-center'><img src='car.svg'/></div><p className='raleway'>Free Shipping on First Order</p><p className='text-center raleway text-[13px] w-[300px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p></div>
      <div className='flex-col flex items-center text-[13px]  justify-center w-[400px] gap-5'><div className='bg-[#fff] w-[85px] rounded-full h-[85px] flex-col flex items-center justify-center'><img src='burger.svg'/></div><p className='raleway'>Variety of Dishes</p><p className='text-center raleway text-[13px] w-[300px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p></div>
<div className='flex-col flex items-center justify-center w-[400px] gap-5'><div className='bg-[#fff] w-[85px] rounded-full h-[85px] flex-col flex items-center justify-center'><img src='clock.svg'/></div><p className='raleway'>Thirty Minutes Delivery</p><p className='text-center raleway text-[13px] w-[300px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p></div> </div>
    {/* <div className='flex-row justify-center items-center  flex gap-3'><FiInstagram color='white'/><FiFacebook color='white'/><FiTwitter color='white'/></div> */}

    </div>
</div>

<p className='text-center text-[20px] font-bold raleway'>Find an Outlet Near You</p>
<div className='pb-10'>
<div className='flex-row flex gap-20 pt-10'>
<div className='flex-col flex items-center'><img src='rest1.png' className='w-[260px] h-[280px]'/><p className='text-[13px] w-[200px] text-center raleway'>762 Fulton St San Francisco, California(CA), 94102</p></div>
<div className='flex-col flex items-center'><img src='rest2.png' className='w-[260px] h-[280px]'/><p className='text-[13px] w-[200px] text-center raleway'>762 Fulton St San Francisco, California(CA), 94102</p></div>
<div className='flex-col flex items-center'><img src='rest3.png' className='w-[260px] h-[280px]'/><p className='text-[13px] w-[200px] text-center raleway'>762 Fulton St San Francisco, California(CA), 94102</p></div>
</div>
</div>
    <div className=' items-center justify-center flex-col flex w-full bg-[#A088C6] h-[300px]'>
    <div className='items-center justify-evenly  flex-row  flex w-[1300px] text-white'>
        <div><p>Bukati.</p></div>
        <div className='flex-row flex '><p>Instagram</p><p className='px-5'>Facebook</p><p>Twitter</p></div>
   <div className='text-white '><p>Contact: +91 1234567899</p></div> </div>
    {/* <div className='flex-row justify-center items-center  flex gap-3'><FiInstagram color='white'/><FiFacebook color='white'/><FiTwitter color='white'/></div> */}

    </div></div>
  )
}
