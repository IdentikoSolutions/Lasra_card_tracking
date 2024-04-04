import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { useLocation } from 'react-router-dom'
// import  OrderBatchSummary  from '../components/ListItemsComponent/OrderBatchSummary'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export const ViewSingleDispatch = () => {
  const {receipt} = useLocation().state
  console.log(receipt,"location")
  const { id } = useParams()
  const [acknowledgedBy, setAcknowledgedBy] = useState('')
  const[deliveredBy, setDeliveredBy] = useState('')
  const [order, updateOrder] = useState<any[]>([])
  console.log('Orders', order)
  const getOneDispatch = useCallback(async () => {
    try {
      const result = await Axios.get(
        `/Dispatch/getCardDispatchByHeaderId?headerId=${id}`
      )
      // console.log(result, 'from get dispatch by id')
      const orderlist = result.data.cardDispatchHeader.map((order: any) => ({
        ...order,
        cards: result.data.cardDispatchHeaderDetail.filter(
          (cards: any) =>
            cards.contacT_LGA.toLowerCase() === order.destination.toLowerCase(),
        ),
      }))
      updateOrder(orderlist)
    } catch (e) {
      console.log(e)
    }
  }, [id])
  const handleSubmit = async (e:any) => {
    // e.preventDefault;
    const payload = {
        status: 1,
        acknowledgedBy: acknowledgedBy,
        receivedBy: order[0].receivedBy,
        deliveredBy: deliveredBy,
        dispatcherName: order[0].dispatcherName,
        dispatchorderid: id,
        dispatchorderon: order[0].dispatchedOrderOn,
        // "dispatchorderon"
      }

    try {
       await Axios.put(
        '/Dispatch/UpdateCardDispatchByOrderId',
        payload,
      )
      toast.success("Successfully updated dispatch status")
    } catch (e) {
return <h1>error has occured</h1>    }
  }
  useEffect(() => {
    getOneDispatch()
  }, [getOneDispatch])
  return (
    <Container className="container-fluid my-5">

      <h2>Dispatch Orders</h2>
      <Form onSubmit={handleSubmit} style={{ background: '#8bceb3',fontWeight:900 }}>
        {order.length > 0 && (
          <>
              <Row>
                <Form.Group as={Col} controlId="formGridOrderId">
                  <Form.Label>Order id:</Form.Label>
                  <Form.Control
                    type="text"
                    value={order[0].id}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCreated" className='md'>
                  <Form.Label>Created By:</Form.Label>
                  <Form.Control
                    type="text"
                    value={order[0].createdBy}
                    readOnly
                  />
                </Form.Group>

            <Form.Group  as={Col} className="mb-3" controlId="formGridDestination">
              <Form.Label>Destination</Form.Label>
              <Form.Control value={order[0].destination} readOnly />
            </Form.Group>
            </Row>
            <Row>

            <Form.Group  as={Col}  className="mb-3" controlId="formGridDispatcher">
              <Form.Label>Dispatcher </Form.Label>
              <Form.Control value={order[0].dispatcherName} readOnly />
            </Form.Group>
              <Form.Group as={Col} controlId="formGridPickup" >
                <Form.Label>Pickup date:</Form.Label>
                <Form.Control type="date" value={order[0].pickupdate} readOnly />
              </Form.Group>
        

              <Form.Group as={Col} controlId="formGridReceivedBy">
                <Form.Label>Received By:</Form.Label>
                <Form.Control
                  value={order[0].receivedBy}
                  readOnly
                  // onChange={(e) => setReceivedBy(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDeliveredBy">
                <Form.Label>delivered By:</Form.Label>
                <Form.Control
                  value={deliveredBy}
                  onChange={(e) => setDeliveredBy(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAcknowledgedBy">
                <Form.Label>AcknowlegdedBy:</Form.Label>
                <Form.Control
                  value={acknowledgedBy}
                  onChange={(e) => setAcknowledgedBy(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button variant="success" className='mb-3' type="submit">
              Acknowledge
            </Button>
        </>
           
        )}
      </Form>

      {/* {order.map((order, idx) => (
        <OrderBatchSummary
          key={idx}
          cards={order.cards}
          destination={order.destination}
          batchId={order.batchNo}
          dispatcherName={''}
          pickUpDate={''}
          batchDispatchStatus={0}
        /> */}
      {/* ))} */}
      <ToastContainer position="bottom-right" newestOnTop/>
    </Container>
  )
}

// export default ViewSingleDispatch
