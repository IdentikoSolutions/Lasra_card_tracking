import React from 'react'
import { Footer, Header } from '../components'
import { Outlet } from 'react-router-dom'
import { SideNav } from '../components'
import {AnimatedBanner} from '../Axios/helpers/banner'
// import { GridContainer, Mainbar } from '../styles/styles'
// import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { PageTrail } from '../components/pageTrail'
import bg_img from '../assets/bg_img.jpeg'

export const  AllReceipt=()=> {
  return (
    <div className='flex flex-row w-[100vw]'
    >
      <div className='flex flex-row w-full'>
        <SideNav />
        <div className="overflow-scroll p-0 flex flex-col flex-1 w-[80vw] pl-10 bg-slate-100 h-full">
          <Header />
          <div className='flex-1 bg-opacity-10' style={{ backgroundImage: `url(${bg_img})` }}
          >
            <PageTrail />
            {/* <AnimatedBanner/> */}
            <div className='m-auto p-2 h-full max-w-[1900px]'>
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* <FloatingWhatsApp
        phoneNumber="07035182795"
        buttonStyle={{ marginBottom: '50px', marginRight: '-20px' }}
        className=" !relative !top-10"
        accountName={'Lasrra'}
      /> */}
    </div>
  )
}

// export default AllReceipt
