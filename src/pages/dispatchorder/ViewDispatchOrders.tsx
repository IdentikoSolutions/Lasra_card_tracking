import React, { useCallback, useEffect, useState } from 'react'
// import { Axios } from '../Axios/Axios'
// import { BatchDetail } from '../components/ListItemsComponent/BatchDetail';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import BatchDetail from '../../components/ListItemsComponent/BatchDetail'
import { getDispatchOrders } from '../../services'
// import { BatchDetail } from '../components/ListItemsComponent'

export const ViewDispatchOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const getDispatch = useCallback(async () => {
    const result = await getDispatchOrders()
    console.log(result, 'get dispatch oderss')
    // const result = {status:200,data:[]}
    // await Axios.get('/Dispatch')
    if (result.status === 200 && result.data.length) {
      setOrders(result.data)
    }
    console.log(result,orders)
  }, [])
  useEffect(() => {
    // setOrders(getDispatchOrders)
     getDispatch()
  },[])
  return (
    <div className='bg-white p-[20px] overflow-hidden'>
      <h2>All Dispatch Orders</h2>
      <Table
        striped
        bordered
        hover
        variant="flat"
        size="xxl"
        className="mb-3 border-2 bg-white odd:bg-zinc-200"
      >
      {orders.length > 0 && (
       <thead>
        <th>Id</th>
        <th>CreatedBy</th>
        <th>CreatedAt</th>
        <th>Dispatcher</th>
        <th>Destination</th>
        {/* <th>createdBy</th> */}
        <th>Status</th>

        {/* <BatchDetail
          field={[
            'createdBy',
            'createdOn',
            'dispatcherName',
            'destination',
            'pickupdate',
            'submissionstatus',
          ]}
          receiptPath={''}
        /> */}
       </thead>

      )}
            <tbody className='bg-red-500'>

      {orders.length > 0 &&
        orders?.map((order, idx) => {
          const {
            createdBy,
            createdAt,
            dispatcher,
            destination,
            pickupdate,
            dispatchStatus,
            batchNo,
            id
          } = order
          return (
            <BatchDetail
              key={idx}
              field={[
                id,
                createdBy,
                createdAt.substr(0,13),
                dispatcher,
                destination,
                // pickupdate,
                dispatchStatus===0?"created":dispatchStatus===1?"Out for delivery":dispatchStatus===2?'delivered':"not delivered"
              ]}
              receipt={order}
              receiptPath={`/receipts/order/vieworders/${id}`}
            />

          )
        })}
            </tbody>

        </Table>
    </div>
  )
}

// export default ViewDispatchOrders
