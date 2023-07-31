"use client";

import React, { useEffect } from 'react'
import {Accordion, AccordionListContainer,ReportACard} from './index'
import { Sidebar } from '../styles/styles'
import { Spinner } from '../skeleton.tsx/spinners'
import { IrootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from '../pages/errorpages/error'

export function SideNav() {
  // const
  const { Cards } = useSelector((state) => state as IrootState)
  const { cards } = Cards

  useEffect(() => {}, [cards])
  return (
    <ErrorBoundary FallbackComponent={FallbackRender} onReset={(details)=>{console.log("onreset")}}>

    <Sidebar>
      {cards.length ? (
        <Accordion page= ''title={'Report a card'}>
          <ReportACard />
        </Accordion>
      )
      : ""
    }
      <Accordion page= '/receipts'title={'Card Production Receipt'} list={'Click to view receipt'}>
        <AccordionListContainer
          options={[]}
          to='/receipts/receipt'
          path={'cards/'}
          source={'/receipts/viewreceipts'}
          searchId={'/Batch/GetCardByBatchId?id'}
        />
        {/* <div onClick={()=>Toggle(!value)}>create new receipt</div> */}

      </Accordion>
      <Accordion
      page='/receipts/provision'
        title={'Card Provision  Receipt'}
        list={'Click on batch to view receipt'}
      >
        <AccordionListContainer
        to='/receipts/provision'
          source={'/receipts/viewprovision'}
          path={'provision/'}
          searchId={'/Card/ViewCardReceiptByBatchId?BatchNo'}
        />
      </Accordion>
      <Accordion page='/receipts/order' title={'Dispatch Orders'} list={'spinner'}>
        <Spinner lines={10} />
      </Accordion>
      <Accordion title={'Retrival Orders'} list={'Lorem ipsum tros catn'} />
      <Accordion
        title={'Home Delivery Orders'}
        list={'Lorem ipsum tros catn'}
      />
    </Sidebar>
    </ErrorBoundary>

  )
}

// export default SideNav
