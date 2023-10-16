import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet } from 'react-router-dom'

function HomeDelivery() {
  return (
    <div
    //  style={{ background: 'white', color: 'black' }}
     >
      {/* <Navbar bg="light" data-bs-theme="light"> */}
        <Nav variant="tabs" >
          <Nav.Item className='text-gray-900 bg-green-200'>
            <Nav.Link href="#" className="nav-link  ">
              All Delivery Request
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='text-gray-900 bg-green-200'>
            <Nav.Link href="viewall" className="nav-link  ">
              View All Delivery Order
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='text-gray-900 bg-green-200'>
            <Nav.Link href="neworder" className="nav-link">
              ...
            </Nav.Link>
          </Nav.Item>
        </Nav>
      {/* </Navbar> */}

      <Outlet />
    </div>
  )
}

export default HomeDelivery
