'use client'
import React, { useEffect } from 'react'
import {ButtonElement, DetailContainer, DetailField, ListContainer } from '../components'
import { color } from '../artifacts/colors'
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { useLocation, useParams } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { currentReceipt } from '../redux/CardReducer'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from './errorpages/error'
import { Ireceipt } from '../interface/interface'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function ViewReceipt() {
  const { id } = useParams()
  const pathname = useLocation().pathname.substring(0, 15)
  console.log(pathname, 'url')

  const dispatch = useDispatch()
  const getBatch = async () => {
    dispatch(currentReceipt({  }))
    
    let endpoint
    if (pathname === '/receipts/cards') {
      endpoint = '/Card/ViewCardReceiptByBatchId?BatchNo='
    } else if (pathname === '/receipts/provi') {
      endpoint = '/Provisioning/ViewAllProvisionedBatchesById?id='
    }

    try {
      const response = await Axios.get(`${endpoint}${id}`)
      console.log('ENDPOINT', endpoint)
console.log('RESPONSE FROM VIEW RECEIPT PAGE',response)
      if (response.status === 200) {
        const { data } = response
        console.log(data,'this is the data received from batchview')
        const dataObj:Ireceipt ={}
        dataObj.batchReceiptHeader = data.cardReceiptHeader ||data.batchProvisionHeader 
        dataObj.cardsReceipt =data.cardReceipts|| data.cardsProvisioned 
        console.log(dataObj,'dataobj')
        dispatch(currentReceipt({ data:dataObj }))
      } else {
        console.log(response.status)
      }
    } catch (e) {
      return toast.error('Could not complete the last action')
      // console.log(e)
    }
  }
  const edit=async()=>{
    try{
const response= await Axios.post(`/Provisioning/updateCardProvisionHeaderByBatchNo?batchno=${id}&status=${1}`)
console.log(response, "success")
    }catch(e){
console.log(e)
    }
  }
  const { Cards } = useSelector((state) => state as IrootState)
  const { receipt } = Cards
  console.log(receipt, 'from view card receipt page')
  let batchProvisionHeader = receipt?.batchReceiptHeader
  let cardsProvisioned = receipt?.cardsReceipt
console.log(batchProvisionHeader, cardsProvisioned,"X3")
  useEffect(() => {
    getBatch()
  }, [])

  return (
    <ErrorBoundary FallbackComponent={FallbackRender} onReset={(details) => {}}>
      <h2>Details page</h2>
      <ButtonElement label={'Edit'} onClick={edit}/>
      <DetailContainer title={'Receipt Details: '}>
        <DetailField
          label="Batch No:"
          bg={color.auto}
          value={batchProvisionHeader?.batchNo}
        />
        <DetailField
          label="No of Cards:"
          bg={color.auto}
          value={cardsProvisioned?.length}
        />
        <DetailField
          label="Date created:"
          bg={color.auto}
          value={batchProvisionHeader?.dateCreated?.substring(0, 10)}
        />
        <DetailField
          label="Date provisioned:"
          bg={color.auto}
          value={batchProvisionHeader?.provisionedOn?.substring(0, 10)}
        />
        <DetailField
          label="received By:"
          bg={color.auto}
          value={batchProvisionHeader?.receivedBy}
        />
        <DetailField
          label="delivered by:"
          bg={color.auto}
          value={batchProvisionHeader?.deliveredBy}
        />
      </DetailContainer>
      <ListContainer title="cards in this Receipt" batchStatus={batchProvisionHeader?.submissionstatus} list={cardsProvisioned} />
     <ToastContainer position="bottom-right" newestOnTop/>
    </ErrorBoundary>
  )
}

export default ViewReceipt
