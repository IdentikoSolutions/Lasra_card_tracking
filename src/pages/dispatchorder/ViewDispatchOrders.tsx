import React, { useCallback, useEffect, useState, memo } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import BatchDetail from '../../components/ListItemsComponent/BatchDetail'
import { getDispatchOrders } from '../../services'

export const ViewDispatchOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const getDispatch = useCallback(async () => {
    const result = await getDispatchOrders()
    // console.log(result, 'get dispatch oderss')
    if (result.status === 200 && result.data.length) {
      setOrders(result.data)
    }
    // console.log(result, orders)
  }, [])
  // getDispatch()

  useEffect(() => {
    getDispatch()
  }, [getDispatch])
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
            <th>Status</th>
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
                dispatchStatus,
                id
              } = order
              return (
                <BatchDetail
                style={`${dispatchStatus===1?' bg-orange-300':''}`}
                  key={idx}
                  field={[
                    id,
                    createdBy,
                    createdAt.substr(0, 13),
                    dispatcher,
                    destination,
                    dispatchStatus === 0 ? "Out for delivery" : dispatchStatus === 1 ? 'delivered' : "not delivered"
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
