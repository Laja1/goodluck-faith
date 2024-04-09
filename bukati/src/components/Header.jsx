 
  import React, { useState,useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

import { useSelector,  } from 'react-redux';
  export default function Header (){
      const [products, setProducts] = useState([]);
      const [admin, setAdmin] = useState([])

     const cartItems = useSelector(state => state.cart.items);
    const [navbar, setNavbar] = useState(true);
const quantity = products.length

useEffect(() => {
  const token = window.localStorage.getItem('token');

  if (!token) {
    console.log('Token not found');
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get('http://localhost:5300/api/user', config)
    .then((res) => {
      if (res.data.message === "unauthorized") {
        setAdmin([]); 
      } else {
        setAdmin(res.data); 
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

const handleLogout = () => {
  window.localStorage.clear();
 window.location.reload()

    };
    return (
      <div className="flex justify-between items-center h-20 w-full bg-[#A088C6] mx-auto px-5 ">
     <p className="text-white text-xl font-bold">Bukati</p>
        <ul className="md:flex hidden items-center">
         
               <a href="/">  <li className="p-4 hover:h-13 raleway  text-[#ffffff]">
              Home
            </li></a> 
            <Link to="/contact">  <li className="p-4 hover:h-13 raleway  text-[#ffffff]">
              Contact
            </li></Link> 
      

   {window.localStorage.length === 1 && ( 
 
 <Link to='/Cart'>
    <div className="items-center mr-2 flex justify-center"> 
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

    </div>
  </Link>
)}        
   {window.localStorage.length === 1 && ( 
 
 <Link to='/Settings'>
    <div className="items-center flex justify-center"> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </div>
  </Link>
)}
      {admin.length > 0 && (
  <Link to='/AdminPage'>
    <div className="bg-[#fff] px-3 py-3 ml-3 rounded-xl">
      <div className="text-center items-center justify-center h-13">
        <div className="flex-row flex items-center">
          <button className="text-black text-[14px] raleway">Admin</button>
        </div>
      </div>
    </div>
  </Link>
)}
          
      {window.localStorage.length ? (
  <div className="bg-[#fff] px-3 py-3 ml-3 rounded-xl"> 
    <div className="text-center items-center justify-center h-13">
      <div className="flex-row flex items-center"> 
        <button onClick={handleLogout} className="text-black text-[14px] raleway">Logout</button>
       
      </div>
    </div> 
  </div>
) : (
  <Link to='/Signup'>    
    <div className="bg-[#fff] px-5 py-3 ml-3 rounded-xl"> 
      <div className="text-center items-center justify-center h-13">
        <div className="flex-row flex items-center"> 
          <p className="text-black text-[14px] raleway">Sign Up</p>
         
        </div>
      </div> 
    </div>
  </Link>
)}
        </ul>
        <div className="block md:hidden">
          {!navbar ? (
           <>
            <img
              src="/x.svg"
              width={20}
              
             
              height={20}
              alt="Close menu"
            />
           
           </>
          ) : (
            <img src="/badge.svg"   width={20} height={20} alt="Open menu" />
          )}

          <div
            className={
              !navbar
                ? "fixed left-0 top-0 w-[50%] border-r-gray-900 h-full bg-[#ffffff] ease-in-out duration-500"
                : "fixed left-[-100%]"
            }
          >
            <a href="/">  <img src="/logo.svg" className="m-5"/></a>
            <ul className="p-4 uppercase">
               <a href="/"> <li className="p-4 border-b border-gray-600 raleway">Home</li></a>
            
               <div className="items-center justify-center flex">
              <div className="pt-60 flex-col flex items-center justify-center gap-5"><a href="/Booking">     <div className="bg-[#ffffff] px-4 py-4 ml-3 rounded-xl"> 
         </div>
        </a> 
      {window.localStorage.length ? (
  <div className="bg-[#ffffff] px-4 py-3 ml-3 rounded-xl"> 
    <div className="text-center items-center justify-center h-13">
      <div className="flex-row flex items-center"> 
        <button onClick={handleLogout} className="text-white text-[14px] raleway">Logout</button>
        <img src="/user.svg" />
      </div>
    </div> 
  </div>
) : (
 <Link to='/Signup'> 
    <div className="bg-[#ffffff] px-3 py-3 ml-3 rounded-xl"> 
      <div className="text-center items-center justify-center h-13">
        <div className="flex-row flex items-center"> 
          <p className="text-white text-[14px] raleway">Sign Up</p>
          <img src="/user.svg" />
        </div>
      </div> 
    </div>
 </Link>    
)} </div></div>
            </ul>
          </div>
        </div>
   
      </div>
    );
  };


