import React, { useEffect, useState } from 'react'
// import DetailContainer from '../components/DetailContainer'
import { ButtonElement, Filter, InputField, InputFieldContainer } from '../components'
import { color } from '../artifacts/colors'
import { FlexRow, WrapperDiv } from '../styles/styles'
import styled from 'styled-components'
import  OrderBatchSummary  from '../components/ListItemsComponent/OrderBatchSummary'
import { IFilterProp, Icard, Iorder } from '../interface/interface'
import { Axios } from '../Axios/Axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
const FlexX = styled(FlexRow)`
  width: fit-content;
  align-content: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  h2 {
    margin: 0;
  }
  button {
    width: fit-content;
  }
  h3 {
    margin: 0;
  }
`

export const DispatchOrder = () => {
  const navigate =useNavigate()
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
    // if (!lga) {
    //   toast.warn("You need to select destination(lga)")
    //   return
    // }
    const result = await Axios.get(
      `/Provisioning/filterprovisionedcards?${cardId > 0 ? `cardId=${cardId}` : 'card=0'
      }${batchId > 0 ? `&batchno=${batchId}` : '&batchno=0'}${lasrraid ? `&lasrraid=${lasrraid}` : ''
      }${comment ? `&comment=${comment}` : ''}${surname ? `&surname=${surname}` : ''
      }${firstname ? `&firstname=${firstname}` : ''}${middlename ? `&middlename=${middlename}` : ''
      }${lga ? `&lga=${lga}` : ''}`,
    )
    console.log("Result",result, 
    // result.data[0].batch 
    )
    if(result.data.length<1){
      toast.error("specified batch was not found")
      return}
    result.data && setOrderObjs([
      ...orderObjs,
      {
        batchId:result.data[0].batch,
        dispatcherName,
        pickUpDate,
        noRecords: result.data.length,
        destination: lga,
        cards: result.data,
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
  const removeOrder =()=>{
    const neworderlist = orderObjs.filter(order=>(order.batchId!==batchId && order.destination !==lga))
    setOrderObjs(neworderlist)
  }
  // function to create dispatch
  const createDispatch = async () => {
   console.log( orderObjs, 'dispatch oders')
    const detail = JSON.stringify({dispatchOrders:{
    "receivedBy": "string",
    "deliveredBy": "string",
    "dispatcherName": "string",
    "createdBy": "string",
    "batchDispatchStatus": 0,
    "noRecords": 0,
    //date of dispatch cant be know on creation point
    "dispatchOrderOn": "2023-10-09T15:55:54.072Z",
    "acknowledgedBy": "string",
    "receivedOn": "2023-10-09T15:55:54.072Z", ...orderObjs }})
    console.log(detail,'detail')
    try {
      const result = await Axios.post("/dispatch/createcarddispatch", detail)
      toast.success(`${Object.values(result.data)[0]}`)
      // setOrderObjs([])
    } catch (e:any) {
      toast.error(<><h3>{e.message}</h3> <p>{e.response.data.title}</p></>)
    }
  }
  useEffect(() => {
  }, [])
  return (
    <div>
      <FlexX>
        {' '}
        <h2>Batches:  </h2>
        {/* <ButtonElement label={'View Order'} onClick={()=> {navigate("/receipts/order/vieworders")}} />

        <ButtonElement label={'Add order'} onClick={getCard} />
        <ButtonElement label={'remove order'} onClick={removeOrder} /> */}
        <InputGroup className="mb-3 mx-3">
        <Button variant="outline-secondary " onClick={()=> {navigate("/receipts/order/vieworders")}}>View Orders</Button>
        <Button variant="outline-secondary" onClick={getCard} >Add Order</Button>
        <Button variant="outline-secondary" onClick={removeOrder}>Remove Order</Button>
      </InputGroup>

      </FlexX>
      <Filter state={filter} setState={setState} />
      <InputFieldContainer title={'Order Details: '}>

        <InputField
          label="Destination:"
          value={filter.lga}
          onChange={(e) => setFilter({ ...filter, lga: e.target.value })}
          bg={color.action}
        />
        <InputField
          label="Dispatcher's Name:"
          type='text'
          value={receiptDetail.dispatcherName}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, dispatcherName: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label=" Name of creator:"
          type='text'
          value={receiptDetail.createdBy}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, createdBy: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="Pickup Date:"
          type='date'
          value={receiptDetail.pickUpDate}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, pickUpDate: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="No of Cards:"
          value={receiptDetail.noOfCard}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, noOfCard: e.target.value })
          }
          bg={color.action}
        />
      </InputFieldContainer>
      {
        orderObjs.length > 0 &&
      <>
      <WrapperDiv>
        {orderObjs.map((cards, idx) => (
          <OrderBatchSummary
            key={idx+" "+cards.batchId}
            {...cards}
          />
        ))}
      </WrapperDiv>
      <ButtonElement onClick={createDispatch} label={'Create Dispatch'} />
      
      </>
      }
      <ToastContainer position='top-right' newestOnTop />
    </div>
  )
}
