'use client'

import React, { useEffect, useState } from 'react'
import { Accordion } from './index'
// import { Sidebar } from '../styles/styles'
import { IrootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from '../pages/errorpages/error'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { CiReceipt } from "react-icons/ci";
import { GoInbox } from "react-icons/go";
import { SiPostman } from "react-icons/si";

import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from './Logo'

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
      icon: <CiReceipt />
    },
    {
      page: '/receipts/viewprovision',
      title: 'Card Provision  Receipt',
      list: '',
      icon: <CiReceipt />
    },
    {
      page: '/receipts/order', title: 'Dispatch Orders', list: '', icon: <GoInbox />
    },
    {
      page: '/receipts/retrival', title: 'Retrival Orders', list: '', icon: <GoInbox />
    },
    {
      page: 'delivery', title: 'Home Delivery Orders', list: '', icon: <SiPostman />
    },
  ]
  const setActive = (num: number) => {
    toggle(num)
  }
  useEffect(() => { }, [cards])
  return (
    <ErrorBoundary
      FallbackComponent={FallbackRender}
      onReset={(details) => {
        console.log(details)
      }}
    >
      <div
        className=' flex-col hidden sm:flex w-[20%] p-0 border-r-2 border-zinc-500'
      >
        <Logo />
        <div
          className='bg-white p-0 lg:px-2 min-h-[90vh] w-full flex-1'
        >
          {options.map((item, idx) => (
            // <>
              <Accordion
                key={idx+item.page}
                page={item.page}
                title={item.title}
                list={item.list}
                active={active}
                setActive={setActive}
                idx={idx}
                icon={item.icon}
              />
            // </>
          ))}
        </div>
      </div>

    </ErrorBoundary>
  )
}
