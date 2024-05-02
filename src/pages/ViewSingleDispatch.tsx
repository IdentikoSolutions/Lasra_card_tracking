import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Formik } from 'formik'
import { OrderBatchSummary } from '../components'
import { button } from '../styles/styles'
import {
  getcardDispatchBylassraIdandDispatchId,
  getDispatchById,
} from '../services'
import { acknowledgeDispatch } from '../services/acknowledgeDispatch'
// export {}

export const ViewSingleDispatch = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [dispatch, setDispatch] = useState<any>({})
  const [lassraId, setLassraId] = useState('')
  const [errors, updateErrors] = useState<any>({})
  const getOneDispatch = useCallback(async () => {
    try {
      const result = await Axios.get(`/dispatch/${id}`)
      setDispatch(result.data)
    } catch (e) {
      console.log(e, 'error')
    }
  }, [])

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault()
    // if (dispatch.receivedBy) {
    //   const { receivedBy, ...err } = errors
    //   updateErrors(err)
    // } else {
    //   updateErrors((errors: any) => ({ ...errors, receivedBy: "Received By is Required" }))
    // }
    if (dispatch.acknowledgedBy) {
      const { acknowledgedBy, ...err } = errors
      updateErrors(err)
    } else {
      updateErrors((errors: any) => ({ ...errors, acknowledgedBy: "Acknowleged By is Required" }))
    }
    if (!dispatch.acknowledgedBy) {
      return
    }
    // here iswhere you make api call
    try {
      const result = await acknowledgeDispatch(dispatch)
      if (result.status === 200) {
        toast.success('Dispatch acknowlegded')
        setTimeout(() => {
          navigate('/receipts/order')
        }, 5000)

      }
    } catch (e: any) {
      toast.error("Already acknowledge",{position:"top-center"})
      setTimeout(() => {
        navigate('/receipts/order')
      }, 5000)
    }
  }, [dispatch.acknowledgedBy, dispatch.receivedBy, errors.receivedBy, errors.acknowledgedMy])
  const add = useCallback(
    async (lassraId: string) => {
      const cardToAdd = await getcardDispatchBylassraIdandDispatchId(
        lassraId,
        dispatch.id,
      )
      console.log('card to add ', cardToAdd)
      if (cardToAdd !== undefined) {
        const newList = dispatch.cardDispatch.concat(cardToAdd)
        console.log(cardToAdd, newList, 'add to card')
        setDispatch({ ...dispatch, cardDispatch: newList })
      }
    },
    [dispatch],
  )

  const remove = useCallback(
    (lassraId: string) => {
      const newList = dispatch.cardDispatch.filter(
        (card: any) => card.lassraId !== lassraId.trim(),
      )
      setDispatch({ ...dispatch, cardDispatch: newList })
    },
    [dispatch],
  )
  useEffect(() => {
    !loaded && getOneDispatch()
  }, [])
  return (
    <div className="w-full ">
      <h2>Dispatch Orders</h2>
      <Formik
        initialValues={dispatch}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {() => (
          <Form
            onSubmit={handleSubmit}
            className="bg-gray-100 shadow-md w-full h-full my-5 p-5"
          >
            {
              <>
                <Row>
                  <Form.Group as={Col} controlId="formGridOrderId">
                    <Form.Label>Order id:</Form.Label>
                    <Form.Control type="text" value={dispatch.id} readOnly />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="formGridCreated"
                    className="md"
                  >
                    <Form.Label>Created By:</Form.Label>
                    <Form.Control
                      type="text"
                      value={dispatch.createdBy}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="mb-3"
                    controlId="formGridDestination"
                  >
                    <Form.Label>Destination</Form.Label>
                    <Form.Control value={dispatch.destination} readOnly />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    controlId="formGridDispatcher"
                  >
                    <Form.Label>Dispatcher </Form.Label>
                    <Form.Control value={dispatch.dispatcher} readOnly />
                  </Form.Group>

                  <div>
                    <Form.Group as={Col} controlId="formGridReceivedBy">
                      <Form.Label>Received By:</Form.Label>
                      <Form.Control
                        value={dispatch?.receivedBy}
                        onChange={(e: any) =>
                          setDispatch({
                            ...dispatch,
                            receivedBy: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <p className="text-red-500  relative top-[-1.7rem] m-0 p-0"> {errors?.receivedBy}</p>

                  </div>
                  <div>
                    <Form.Group as={Col} controlId="formGridAcknowledgedBy">
                      <Form.Label>AcknowlegdedBy:</Form.Label>
                      <Form.Control
                        value={dispatch?.acknowledgedBy}
                        onChange={(e: any) =>
                          setDispatch({
                            ...dispatch,
                            acknowledgedBy: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <p className="text-red-500 relative top-[-1.7rem] m-0 p-0"> {errors?.acknowledgedBy}</p>
                  </div>
                </Row>
                <button className={button + ' h-fit '} type="submit">
                  Acknowledge
                </button>
              </>
            }
          </Form>
        )}

      </Formik>

      <>
        <div className="w-full flex justify-between gap-10 text-center ">
          <button className={button} onClick={(e) => add(lassraId)}>
            Add
          </button>
          <input
            type="text"
            value={lassraId}
            onChange={(e) => setLassraId(e.target.value)}
          />
          <button className={button} onClick={() => remove(lassraId)}>
            Remove
          </button>
        </div>
        {dispatch.cardDispatch && (
          <OrderBatchSummary cards={dispatch.cardDispatch} />
        )}
      </>

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}
