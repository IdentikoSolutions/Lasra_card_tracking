import React from 'react'
import { BatchDetail } from './BatchDetail'
import styled from 'styled-components'
import { IcardReceipt } from '../../interface/interface'
// import {  IbatchReceipt } from '../../interface/interface'
interface Idispatch {
    batchId: number,
    receivedBy: string,
    deliveredBy: string,
    destination: string,
    dispatcherName: string,
    createdBy: string,
    batchDispatchStatus: number,
    noRecords: number,
    pickUpDate: string,
    dispatchOrderOn?: string,
    cards: IcardReceipt[]
}
export const data1 = {
  batch: 32,
  receivedBy: 'john',
  deliveredBy: 'David',
  destination: 'ikeja',
  dispatcherName: 'olu',
  createdBy: 'Otedola',
  batchDispatchStatus: 0,
  noRecords: 83,
  pickupDate: '2023-08-23',
  dispatchedOn: '2023-08-23',
  cards: [
    {
      cardId: 8160,
      status: 0,
      comment: 'dispatched',
    },
    {
      cardId: 8161,
      status: 0,
      comment: 'dispatched',
    },
    {
      cardId: 8162,
      status: 0,
      comment: 'dispatched',
    },
    {
      cardId: 8163,
      status: 0,
      comment: 'dispatched',
    },
  ],
}
const OrderWrapper = styled.div`
  background: white;
  display: grid;
  grid-template-columns: 200px auto;
`
const OrderContent = styled(OrderWrapper)`
  grid-template-columns: auto;
  border-left: 1px solid #ccc;
  border-radius: 0 0 0 15px;
  margin: 5px 2px;
`
export const OrderBatchSummary: React.FC<Idispatch> = (cards) => {
  console.log(cards, 'this is data')
  // const d
  return (
    <OrderWrapper>
      <div style={{ padding: '1rem' }}>
        <p>batchId: {cards.batch}</p>
        <p>noRecords: {cards.noRecords}</p>
        <p>Destination: {cards.destination}</p>
      </div>
      <OrderContent>
        {cards.cards &&
          cards.cards.map((card, idx) => (
            <BatchDetail
              receiptPath=""
              key={idx}
              field={[
                card.cardId.toString(),
                `${card.status === 0 ? 'received' : 'not received'}`,
                card.comment,
              ]}
            />
          ))}
      </OrderContent>
    </OrderWrapper>
  )
}
