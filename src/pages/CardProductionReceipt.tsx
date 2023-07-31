import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
  InputFieldContainer,
  InputField,
  ListContainer,
  ButtonElement,
  DetailContainer,
  DetailField,
  Select,
} from '../components'
import { useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { GridBox, List } from '../styles/styles'
import { color } from '../artifacts/colors'
import styled from 'styled-components'
import { IGridBox } from '../interface/interface'
import { Axios } from '../Axios/Axios'
import { generatePdf } from '../Axios/helpers/jsPDf';
export {}
const VariableGrid = styled(GridBox)<IGridBox>`
padding:50px;
`

function CardProductionReceipt() {
  let {Cards} = useSelector((state) => {
    return (state as IrootState)
  })
  const {reports,cards,batchDetail} = Cards
  const [receiptDetail, setReceiptDetail] = useState({date:"",receivedBy:"",deliveredBy:""})
  const details = {
    batchId:batchDetail.batchNo,
    cardreceivedOn:receiptDetail.date,
    receivedOn:receiptDetail.date,
    receivedBy:receiptDetail.receivedBy,
    batchCardReceiptStatus:0,
    deliveredBy:receiptDetail.deliveredBy,
    submissionStatus: 0,
    cards:cards.concat(reports).map(card=>({cardId:card.id, status:card.status, comment:card.comment||""}))
  }
  const save = async()=>{
   
    // console.log( "create receipt details",details)
    try{
// const response = 
console.log(details,'details from create card')
await Axios.post("/Card/CreateCardReceipt",details)
toast.success('receipt created successfull')
    }catch(e:any){
toast.error(<><h2>Request Failed</h2> <p>{e.message && e.message}</p></>)
    }
  }
  const submit = async()=>{
    try{
// save()
details.submissionStatus=1
await Axios.post("/Card/CreateCardReceipt",details)

// await Axios.post(`/Card/updateCardReceiptHeaderByBatchNo?batchno=${batchDetail.batchNo}&status=1`)
toast.success(<h3>Submitted successfully</h3>)
    }catch(e){
toast.error(<><h3>Error occured</h3> Error Detail: {e}</>)
    }

  }
  useEffect(() => {}, [Cards])
  return (
    <div >
      {/* <MainSearch field={'Batch No'} padding={'0.5rem'} api={`/Batch/GetCardByBatchId?id=${search}`} search={search} onChange={(e) => setSearch(e.target.value)} /> */}
      <Select options ={[1,22,3,4,32]} path={"/receipts/provision/"}/>
      <div id='content'>
      <h1>CARD PRODUCTION RECEIPT</h1>

      <DetailContainer title={'Batch Details: '}>
        <DetailField label="Batch No:" bg={color.auto}  value={batchDetail?.batchNo} />
        <DetailField label="No of Cards:"  bg={color.auto}   value={batchDetail?.noRecords}/>
        <DetailField label="Date created:"  bg={color.auto} value={batchDetail?.bankDataCreatedOn?.substring(0,10)}/>
      </DetailContainer>
      <InputFieldContainer title={'Card received details: '}>
        <InputField label="Date received:" value={receiptDetail.date} onChange={(e)=> setReceiptDetail({...receiptDetail,date:e.target.value})} bg={color.action} />
        <InputField label="Received by:" value={receiptDetail.receivedBy} onChange={(e)=> setReceiptDetail({...receiptDetail,receivedBy:e.target.value})} bg={color.action}/>
        <InputField label="Delivered by:" value={receiptDetail.deliveredBy} onChange={(e)=> setReceiptDetail({...receiptDetail,deliveredBy:e.target.value})} bg={color.action}/>
      </InputFieldContainer>
      {/* <VariableGrid template={"75% auto"}> */}
        <ListContainer  title="CARDS" list={cards}/>
        {/* <ListContainer width={''} title="REPORT A CARD">
          <ReportACard/>
        </ListContainer> */}
        {reports.length ? (<ListContainer title="FAILED CARDS" list={reports} />) : (
          ''
        )}
      </div>

    <ToastContainer position="bottom-right" newestOnTop />

    <ButtonElement label="Save" onClick={save} />
    <ButtonElement label="Submit" onClick={submit} />
    <button onClick={()=>generatePdf('#content')}>generatepdf</button>

      {/* </VariableGrid> */}
      {/* <Footer/> */}
    </div>
  )
}
export default CardProductionReceipt
