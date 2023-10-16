'use client'
import React, { useCallback, useEffect } from 'react'
import { ButtonElement, DetailContainer, DetailField, ListContainer } from '../components'
import { color } from '../artifacts/colors'
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { useLocation, useParams } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { currentReceipt } from '../redux/CardReducer'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from './errorpages/error'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function ViewReceipt() {
  const { id } = useParams()
  const pathname = useLocation().pathname.substring(0, 15)
  const dispatch = useDispatch()


  const getBatch= useCallback(async()=>{
    // dispatch(currentReceipt({}))
    let endpoint
    if (pathname === '/receipts/cards') {
      endpoint = '/Card/ViewCardReceiptByBatchId?BatchNo='
    } else if (pathname === '/receipts/provi') {
      endpoint = '/Provisioning/ViewAllProvisionedBatchesById?id='
    }
    try {
      const response = await Axios.get(`${endpoint}${id}`)
      // console.log('RESPONSE FROM VIEW RECEIPT PAGE',response)
      if (response.status === 200) {
        const { data } = response
        const header = data.cardReceiptHeader || data.batchProvisionHeader
        const receiptInfo = data.cardReceipts || data.cardsProvisioned
        let dataObj = { batchProvisionHeader: header, cardsReceipt: receiptInfo }
        dispatch(currentReceipt({ data: dataObj }))
      } else {
        toast.error(response.status+": not successful")
      }
    } catch (e) {
      return toast.error('Could not complete the last action')
      // console.log(e)
    }
  },[pathname,dispatch,id])
  // getBatch()
  const edit = async () => {
    try {
       await Axios.post(`/Provisioning/updateCardProvisionHeaderByBatchNo?batchno=${id}&status=${1}`)
      toast.success('successfully edited')
    } catch (e) {
      toast.error("could not successfuly edit card")
    }
  }
  const { Cards } = useSelector((state) => state as IrootState)
  const { receipt } = Cards
  let batchProvisionHeader = receipt?.batchReceiptHeader
  let cardsReceipt = receipt?.cardsReceipt
  
  useEffect(() => {
    getBatch()
  },[getBatch])

  return (
    <ErrorBoundary FallbackComponent={FallbackRender} onReset={(details) => { }}>
      <h2>Details page</h2>
      <ButtonElement label={'Edit'} onClick={edit} />
      <DetailContainer title={'Receipt Details: '}>
        <DetailField
          label="Batch No:"
          bg={color.auto}
          value={batchProvisionHeader?.batchNo}
        />
        <DetailField
          label="No of Cards:"
          bg={color.auto}
          value={cardsReceipt?.length}
        />
        <DetailField
        type='date'

          label="Date created:"
          bg={color.auto}
          value={batchProvisionHeader?.dateCreated?.substring(0, 10)}
        />
        <DetailField
        type='date'

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
      <ListContainer title="cards in this Receipt" batchStatus={batchProvisionHeader?.submissionstatus} list={cardsReceipt} />
      <ToastContainer position="bottom-right" newestOnTop />
    </ErrorBoundary>
  )
}

export default ViewReceipt
