import React from 'react'
import { Footer, Header } from '../components'
import { Outlet } from 'react-router-dom'
import { SideNav } from '../components'
import { GridContainer, Mainbar } from '../styles/styles'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

function AllReceipt() {
  return (
    <div>
      <Header />
      <GridContainer>
        <SideNav />
        <Mainbar className="relative flex flex-1 pt-3 w-[80vw] ml-10">
          <div id="portal"></div>
          <Outlet />
        </Mainbar>
      </GridContainer>

      <FloatingWhatsApp
        phoneNumber="07035182795"
        buttonStyle={{ marginBottom: '50px', marginRight: '-20px' }}
        className=" !relative !top-10"
        accountName={'Lasrra'}
      />
      <Footer />
    </div>
  )
}

export default AllReceipt
