import React, { useState } from 'react'
// import lasralogo from '../assests/images/lasralogo.png'
// import lasralogo from '../assets/images/lasralogo.png'
import { Link } from 'react-router-dom'
import { LogoWrapper } from '../styles/styles'
import { MdMenu } from "react-icons/md";
import { VscTriangleDown } from "react-icons/vsc";
import logo from '../assets/logo.jpg'
import styled from 'styled-components'
export interface Ilogowrapper {
  width: string,
  height: string,
  src: string
  // Other prop definitions
}
export const LogoBox = styled(LogoWrapper) <Ilogowrapper>`
  `

function Logo() {
  const [openList, toggleOpen] = useState(false)
  return (
    <>
      <div className='h-fit flex-col lg:w-full flex md:flex-col md:w-fit lg:flex-row justify-between items-center lg:p-3 m-0 text-[1.5rem] text-gray-600 border-b'>
        <Link to={'/'}>
          <div className='w-[100px] h-[50px] bg-cover'
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
        </Link>

        <div className='px-3 flex lg:flex-1 items-center justify-between' onClick={()=>toggleOpen(!openList)}> <VscTriangleDown />
          LASRRA</div>
        <MdMenu className='font-bold text-[2rem] hidden md:flex' />

      </div>
      <div
      onClick={()=>toggleOpen(!openList)}
       className={`${openList?'flex flex-col ' :'hidden '}bg-white w-fit lg:w-[200px] opacity-100 z-[100] h-fit absolute top-[82px] rounded left-[70px]  shadow-sm items-center text-center leading-10`}>
        <p className='hover:bg-blue-50 m-0'>
          item1
        </p>
        <p className='hover:bg-blue-50 m-0'>
          item1
        </p>
        <p className='hover:bg-blue-50 m-o'>
          item1
        </p>
      </div>
    </>
  )
}

export default Logo
