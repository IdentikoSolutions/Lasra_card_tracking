import React, { memo } from 'react'
// import { BatchDetail } from './BatchDetail'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table'
import { IcardReceipt, Iorder, ReceiptType } from '../../interface/interface'
import BatchDetail from './BatchDetail'
const OrderWrapper = styled.div`
  background: white;
  border: 3px black solid;
  display: grid;
  grid-template-columns: 200px auto;
`
const OrderContent = styled(OrderWrapper)`
  grid-template-columns: auto;

  border-left: 1px solid #ccc;
  border-radius: 0 0 0 15px;
  overflow-y: hidden;
  border: 3px 0;
  margin: 100px;
  margin: 5px 2px;
`
const OrderBatchSummary: React.FC<Iorder> = (cards) => {
  console.log(cards.cards[0], 'cards')
  return (
    <OrderWrapper>
      <div style={{ padding: '1rem' }}>
        <p>batchId: {cards.batchId}</p>
        <p>noRecords: {cards.noRecords}</p>
        <p>Destination: {cards.destination}</p>
      </div>
      <OrderContent>
      <Table striped bordered hover variant="flat" size="xxl" className="mb-3">
        <tbody>
          {cards.cards &&
            cards.cards.map((card, idx) => (
              <BatchDetail
                receiptPath=""
                key={idx}
                field={[
                  card.lasrraId,
                  card.surname,
                  card.firstname,
                  card.middlename,
                  // card.cardId.toString(),
                  `${card.status === 0 ? 'received' : 'not received'}`,
                  card.comment,
                ]}
              />
            ))}
        </tbody>
      </Table>

      </OrderContent>
    </OrderWrapper>
  )
}
export default memo(OrderBatchSummary)
