import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet, useNavigate } from 'react-router-dom'
const list = [
  { title: 'View All Request', to: '' },
  { title: 'View All Delivery Order', to: 'viewall' },
  { title: 'View All Fullfilled Request', to: 'neworder' },
  { title: '...', to: '*' },
]
const NavLink: React.FC<{ title: string; to: string,active:number,idx:number,setActive:any }> = ({ title, to,active,idx,setActive }) => {
  const navigate = useNavigate()
  const handler=() => {
      setActive(idx);
      navigate(to)
    }
  return (
    <div
      onClick={handler}
      className={` ${active===idx? "bg-white text-black  border-b-[0px]  ":"bg-green-200 text-gray-600 border-b-2 "}w-fit h-10  border-t-2 border-l-2 border-r-2 px-3 py-2 flex-grow rounded-tr-[8px] rounded-tl-[8px]`}
    >
      <p className='text-center font-bold'>{title}</p>
    </div>
  )
}
function HomeDelivery() {
  const [active,setActive] =useState(0)
  return (
    <div className='relative'>
      {/* <div id='portal' className='absolute w-[100vw] h-[100vh]'></div> */}

      <h1>Home Delivery</h1>
      <div className="flex m-0 border-0">
       
        {list.map((item, idx) => (
          <NavLink key={idx} title={item.title} active={active} idx={idx} setActive={setActive} to={item.to} />
        ))}
      </div>
      <div className='w-[100%] m-0 p-5 bg-white border-0 flex-1 h-full'>
      <Outlet />

      </div>

    </div>
  )
}

export default HomeDelivery
