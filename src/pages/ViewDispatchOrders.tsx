import React, { useCallback, useEffect, useState } from 'react'
import { Axios } from '../Axios/Axios'
// import { BatchDetail } from '../components/ListItemsComponent/BatchDetail';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import BatchDetail from '../components/ListItemsComponent/BatchDetail'
// import { BatchDetail } from '../components/ListItemsComponent'

export const ViewDispatchOrders = () => {
  const [orders, setOrders] = useState([])
  const getDispatchOrders = useCallback(async () => {
    const result = await Axios.get('/Dispatch/GetAllBatchDispatched')
    if (result.status === 200) {
      setOrders(result.data)
    }
    console.log(result,orders)
  }, [])
  useEffect(() => {
    // setOrders(getDispatchOrders)
     getDispatchOrders()
  },[])
  return (
    <div className='bg-white p-[20px] overflow-hidden'>
      <h2>All Dispatch Orders</h2>
      <table
        // striped
        // bordered
        // hover
        // variant="flat"
        // size="xxl"
        className="mb-3 border-2 bg-white"
      >
      {orders.length > 0 && (
       <thead>

        <BatchDetail
          field={[
            'createdBy',
            'createdOn',
            'dispatcherName',
            'destination',
            'pickupdate',
            'submissionstatus',
          ]}
          receiptPath={''}
        />
       </thead>

      )}
      {orders.length > 0 &&
        orders.map((order, idx) => {
          const {
            createdBy,
            createdOn,
            dispatcherName,
            destination,
            pickupdate,
            submissionstatus,
            batchNo,
            id
          } = order
          return (
            <tbody className='bg-red-500'>

            <BatchDetail
              key={idx}
              field={[
                createdBy,
                createdOn,
                dispatcherName,
                destination,
                pickupdate,
                submissionstatus,
              ]}
              receiptPath={`/receipts/order/vieworders/${id}`}
            />
            </tbody>

          )
        })}
        </table>
    </div>
  )
}

// export default ViewDispatchOrders
