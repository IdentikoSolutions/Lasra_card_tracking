import React from 'react'
import { Footer, Header } from '../components'
import { Outlet } from 'react-router-dom'
import { SideNav } from '../components'
import { GridContainer, Mainbar } from '../styles/styles'

function AllReceipt() {
  
  return (
    <div>
      <Header />
      <GridContainer>
        <SideNav />
        <Mainbar>
          {/* <div id="content"> */}
            <Outlet />
          {/* </div> */}
        </Mainbar>
      </GridContainer>

      <Footer />
    </div>
  )
}

export default AllReceipt
