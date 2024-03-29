import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import {  Filter, InputField, InputFieldContainer } from '../components'
import OrderBatchSummary from '../components/ListItemsComponent/OrderBatchSummary'
import { IFilterProp, Icard, Iorder } from '../interface/interface'
import { Axios } from '../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import InputGroup from 'react-bootstrap/InputGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { button } from '../styles/styles'


export const DispatchOrder = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  const [receiptDetail, setReceiptDetail] = useState({
    destination: '',
    dispatcherName: '',
    pickUpDate: '',
    noOfCard: '',
    createdBy: ''
  })
  const { destination, dispatcherName, pickUpDate, noOfCard, createdBy } = receiptDetail
  const [filter, setFilter] = useState<IFilterProp['state']>({
    batchId: 0,
    cardId: 0,
    comment: '',
    surname: '',
    firstname: '',
    middlename: '',
    lasrraid: '',
    lga: '',
  })
  const {
    batchId,
    cardId,
    comment,
    surname,
    firstname,
    middlename,
    lasrraid,
    lga,
  } = filter
  function setState(
    statevalue: IFilterProp['state'],
    title: string,
    value: string,
  ) {
    setFilter({ ...statevalue, [`${title}`]: value })
  }
  const [input, setInput] = useState(0)
  const [orderObjs, setOrderObjs] = useState<Iorder[]>([])

  //filter cards
  const getCard = async () => {
    if (location !== '/receipts/order/all') {
      navigate('/receipts/order/all')
      return
    }

    const result = await Axios.get(
      `/Provisioning/filterprovisionedcards?${cardId > 0 ? `cardId=${cardId}` : 'card=0'
      }${batchId > 0 ? `&batchno=${batchId}` : '&batchno=0'}${lasrraid ? `&lasrraid=${lasrraid}` : ''
      }${comment ? `&comment=${comment}` : ''}${surname ? `&surname=${surname}` : ''
      }${firstname ? `&firstname=${firstname}` : ''}${middlename ? `&middlename=${middlename}` : ''
      }${lga ? `&lga=${lga}` : ''}`,
    )

    if (result?.data?.length < 1) {
      toast.error("specified batch was not found")
      return
    }
    result?.data && setOrderObjs([
      ...orderObjs,
      {
        batchId: result?.data[0].batch,
        dispatcherName,
        pickUpDate,
        noRecords: result?.data.length,
        destination: lga,
        cards: result?.data,
        batchDispatchStatus: 0,
        createdBy,
        receivedBy: "string",
        deliveredBy: "string",
        dispatchOrderOn: "2023-08-09",
      },
    ])
    setFilter({
      batchId: 0,
      cardId: 0,
      comment: '',
      surname: '',
      firstname: '',
      middlename: '',
      lasrraid: '',
      lga: '',
    })
  }
  const removeOrder = () => {
    const neworderlist = orderObjs.filter(order => (order.batchId !== batchId && order.destination !== lga))
    setOrderObjs(neworderlist)
  }
  // function to create dispatch
  const createDispatch = async () => {
    console.log(orderObjs, 'dispatch oders')
    const detail = JSON.stringify({
      dispatchOrders: {
        "receivedBy": "string",
        "deliveredBy": "string",
        "dispatcherName": "string",
        "createdBy": "string",
        "batchDispatchStatus": 0,
        "noRecords": 0,
        "dispatchOrderOn": "2023-10-09T15:55:54.072Z",
        "acknowledgedBy": "string",
        "receivedOn": "2023-10-09T15:55:54.072Z", ...orderObjs
      }
    })
    console.log(detail, 'detail')
    try {
      const result = await Axios.post("/dispatch/createcarddispatch", detail)
      toast.success(`${Object.values(result.data)[0]}`)
      // setOrderObjs([])
    } catch (e: any) {
      toast.error(<><h3>{e.message}</h3> <p>{e.response.data.title}</p></>)
    }
  }
  useEffect(() => {
  }, [])
  return (
    <div>
      <div className='flex'>
        {' '}
        {/* <h2>Batches:  </h2> */}
        <InputGroup className=" mb-3 mx-3">
          <button className='hover:bg-green-500 hover:text-white bg-green-100 p-2 rounded-md border-1' onClick={() => { navigate("/receipts/order") }}>View Orders</button>
          <button className='hover:bg-green-500  hover:text-white bg-green-100 p-2 rounded-md border-1' onClick={getCard} >Add Order</button>
          <button className='hover:bg-green-500  hover:text-white bg-green-100 p-2 rounded-md border-1' onClick={removeOrder}>Remove Order</button>
        </InputGroup>
      </div>
      <Outlet context={{ filter, setState, orderObjs, setFilter, receiptDetail, setReceiptDetail, createDispatch } satisfies OutletContextType} />
      <ToastContainer position='top-right' newestOnTop />
    </div>
  )
}
type OutletContextType = { filter: any, setState: any, orderObjs: any, setFilter: any, receiptDetail: any, setReceiptDetail: any, createDispatch: any }
export function OrdersMAngager() {
  const { filter, setState, orderObjs, setFilter, receiptDetail, setReceiptDetail, createDispatch } = useOutletContext<OutletContextType>()
  return <><Filter state={filter} setState={setState} />
    {orderObjs.length > 0 &&
      <InputFieldContainer title={'Order Details: '}>
        <InputField
          label="Destination:"
          value={filter.lga}
          onChange={(e) => setFilter({ ...filter, lga: e.target.value })}
          bg={'green'}
        />
        <InputField
          label="Dispatcher's Name:"
          type='text'
          value={receiptDetail.dispatcherName}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, dispatcherName: e.target.value })
          }
          bg={'green'}
        />
        <InputField
          label=" Name of creator:"
          type='text'
          value={receiptDetail.createdBy}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, createdBy: e.target.value })
          }
          bg={'green'}
        />
        <InputField
          label="Pickup Date:"
          type='date'
          value={receiptDetail.pickUpDate}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, pickUpDate: e.target.value })
          }
          bg={'green'}
        />
        <InputField
          label="No of Cards:"
          value={receiptDetail.noOfCard}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, noOfCard: e.target.value })
          }
          bg={'green'}
        />
      </InputFieldContainer>}
    {
      orderObjs.length > 0 &&
      <>
        <div className='flex flex-col h-[100vh] p-[0.5rem] m-[0.5rem] transparent overfow-x-hidden'>
          {orderObjs.map((cards, idx) => (
            <OrderBatchSummary
              key={idx + " " + cards.batchId}
              {...cards}
            />
          ))}
        </div>
        <button onClick={createDispatch} className={button} >Create Dispatch</button>

      </>
    }
  </>
}