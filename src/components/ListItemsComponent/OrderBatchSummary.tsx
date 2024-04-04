import React, { memo, useCallback, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import BatchDetail from './BatchDetail'
import { fetchOneCard } from '../../services'

export const OrderBatchSummary: React.FC<{cards:any}> = ({ cards }) => {
  // console.log(cards, 'cards')
  const [OrderCard, setOrderCard] = useState<any[]>([])
  const batchNoList =OrderCard.map(card => card.batchNo)
    const batchSet = new Set(batchNoList)
  const batches = Array.from(batchSet).map(card => ({
    batchId: card,
    count: OrderCard.filter(item => item.batchNo === card).length,
    cards: OrderCard.filter(item => item.batchNo === card)

  }))
  // console.log(batches, 'Batches')
  const fullCardInfo = useCallback(() => {
    console.log("callled");
  return Promise.all(cards.map(async (card: { lassraId: string }) => await fetchOneCard(card.lassraId, '')))
  .then(values => {
    setOrderCard(values)
  })},[cards])

  useEffect(() => {
    const result = fullCardInfo()
    // console.log(result, 'full card info')

  }, [cards])
  return (
    <div className='bg-white shadow-md'>
      {
      batches.map((item ,idx)=> (<div key={idx}><BatchSumary batch={item} /> <hr/></div>))
    }
    </div>
  )
}
// export default memo(OrderBatchSummary)
const BatchSumary: React.FC<{ batch: any }> = ({ batch }) => {
  // console.log(batch)
  return <div className='flex flex-1 justify-evenly mt-4'>
    <div className='font-bold '>
      <p>Batch No: {batch.batchId}</p>
      <p>No of Records: {batch.count}</p>
    </div>
    <div>
      <Table striped bordered hover variant="flat" size="xxl" className="mb-1 border-l-2 flex-1 rounded-md">
        <tbody>
          {batch.cards.length > 0 &&
            batch.cards.map((card: { lassraId: string; surname: string; first_name: string; middle_name: string }, idx: React.Key | null | undefined) => (
              <BatchDetail
                receiptPath=""
                key={idx}
                field={[
                  card.lassraId,
                  card.surname,
                  card.first_name,
                  card.middle_name,
                  // card.cardId.toString(),
                  // `${card.status === 0 ? 'received' : 'not received'}`,
                  // card.comment,
                ]}
              />
            ))}
        </tbody>
      </Table>

    </div>
  </div>
}