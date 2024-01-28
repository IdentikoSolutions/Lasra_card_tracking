import React, { useState } from 'react'
import Logo from '../artifacts/Logo'
import { IoSearch } from "react-icons/io5";
// import { FaUserLarge } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";

import { useApp } from './context/AppContext'
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate()
  const { user } = useApp() as any
  const [drop, toggleDrop] = useState(false)
  console.log(user, 'user')
  return (
    <div className="bg-green-500 w-full flex justify-between items-center  h-fit p-[0.2rem] shadow-sm">
      {/* <Logo /> */}
      <div className="flex justify-between  flex-1 ">
        <div className='flex items-center'>
          <label className='text-gray-300 text-[2rem] p-2'> <IoSearch />
          </label>
          <input type='search' className='bg-transparent border-b text-white active:border-none' />
        </div>
        {/* <p className="  text-[3rem] self-start text-green-700 px-10 ">
          {pageName}
        </p> */}
        <div onClick={()=>toggleDrop(!drop)}  className='relative flex justify-end items-center border-l p-2 text-gray-200 font-bold text-center min-w-[250px]'>
          {user}
          <div className='rounded-full w-[60px] h-[60px] mx-2 bg-slate-200 flex justify-center items-center text-[3rem] p-2 text-blue-400'>
            <FaUser />
          </div>
          <FaSortDown />
          <div onClick={()=>toggleDrop(!drop)} className={`${drop ? "hidden" : 'flex-col flex'} bg-white w-[200px] h-fit absolute top-[80px] z-[100] self-center left-[50px] rounded-sm shadow-sm`}>
            <div className={`flex px-3  text-gray-900 items-center w-full py-2 justify-evenly font-thin border-b hover:bg-slate-200`}>
              <RiUser3Line />
              My profile
            </div>
            <div onClick={() => navigate('/')} className='flex px-3  w-full py-2 text-gray-900 items-center justify-evenly font-thin hover:bg-slate-200 border-b'>
              <FaPowerOff className='text-red-500' />
              Log Out
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
