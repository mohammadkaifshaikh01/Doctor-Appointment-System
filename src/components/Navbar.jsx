import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
   const [showMenu , setShowMenu] = useState(false)
   const [token , setToken] = useState(true)
   const navigate = useNavigate();
  return (
    <div className='flex item-center justify-between text-sm py-3 mb-5 border-b border-b-gray-400'>
   <img onClick={()=>navigate("/")} src={assets.logo_doc} alt='logo' className='w-41 h-13 cursor-pointer'/>
   <ul className='hidden md:flex item-start gap-10 font-medium'>
      <NavLink to={"/"}>
         <li className='py-3'>HOME</li>
         <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to={"/doctors"}>
         <li className='py-3'>DOCTORS</li>
         <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to={"/about"}>
         <li className='py-3'>ABOUT</li>
         <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to={"/contact"}>
         <li className='py-3'>CONTACT</li>
         <hr className='border-none outline-none h-0.5 bg-orange-500 w-3/5 m-auto hidden'/>
      </NavLink>
   </ul>
   <div className='flex item-center gap-4'>
   {
      token 
      ? <div className='flex item-center gap-2 cursor-pointer group relative'>
         <img className='w-9 h-9 my-1 rounded-full' src={assets.profile_pic} alt='profile'/>
         <img className='w-2.5' src={assets.dropdown_icon} alt='dropdown'/>
         <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
         <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
            <p onClick={()=>navigate("/my-profile")} className='hover:text-black cursor-pointer'>My Profile</p>
            <p onClick={()=>navigate("/my-appointment")} className='hover:text-black cursor-pointer'>My Appointments</p>
            <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
         </div>
      </div>
      </div>
      
      : <button onClick={()=>navigate("/login")} className='cursor-pointer bg-orange-500 py-2 text-white px-7 rounded-full font-light hidden md:block'>Create Account</button>
      
   }
     
   </div>
    </div>
  )
}

export default Navbar
