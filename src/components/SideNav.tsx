'use client'

import React, { useEffect, useState } from 'react'
import { Accordion } from './index'
import { Sidebar } from '../styles/styles'
import { IrootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from '../pages/errorpages/error'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

export function SideNav() {
  // const
  const { Cards } = useSelector((state) => state as IrootState)
  const { cards } = Cards
  const [active, toggle] = useState(-1)
  let options = [
    {
      page: '/receipts/viewreceipts',
      title: 'Card Production Receipt',
      list: '',
    },
    {
      page: '/receipts/viewprovision',
      title: 'Card Provision  Receipt',
      list: '',
    },
    { page: '/receipts/order', title: 'Dispatch Orders', list: '' },
    { page: '/receipts/retrival', title: 'Retrival Orders', list: '' },
    { page: 'delivery', title: 'Home Delivery Orders', list: '' },
  ]
  const setActive = (num: number) => {
    toggle(num)
  }
  useEffect(() => {}, [cards])
  return (
    <ErrorBoundary
      FallbackComponent={FallbackRender}
      onReset={(details) => {
        console.log('onreset')
      }}
    >
      {/* <Container> */}
      {/* <> */}
      <Sidebar>
       
        {options.map((item, idx) => (
          <>
            <Navbar className="bg-body-tertiary">
              <Container>
                <Accordion
                  key={idx}
                  page={item.page}
                  title={item.title}
                  list={item.list}
                  active={active}
                  setActive={setActive}
                  idx={idx}
                />
              </Container>
            </Navbar>
            {/* <br /> */}
          </>
        ))}
        {/* </Container> */}
      </Sidebar>
      {/* </> */}
    </ErrorBoundary>
  )
}
