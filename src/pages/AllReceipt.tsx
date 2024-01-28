import React from 'react'
import { Footer, Header } from '../components'
import { Outlet } from 'react-router-dom'
import { SideNav } from '../components'
import { GridContainer, Mainbar } from '../styles/styles'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

function AllReceipt() {
  return (
    <div className='flex flex-row w-[100vw]'>
      <div className='flex flex-row'>
        <SideNav />
        <Mainbar className=" flex flex-col flex-1 w-[80vw] ml-10 bg-slate-100">
          <Header />
          <div className='flex-1'>
            <div id="portal">

            </div>
            <div className='mx-10'>
              <Outlet />

            </div>
          </div>

          <Footer />

        </Mainbar>
      </div>

      <FloatingWhatsApp
        phoneNumber="07035182795"
        buttonStyle={{ marginBottom: '50px', marginRight: '-20px' }}
        className=" !relative !top-10"
        accountName={'Lasrra'}
      />
    </div>
  )
}

export default AllReceipt
