'use client'
import React, { useCallback, useEffect } from 'react'
import {
  ButtonElement,
  DetailContainer,
  DetailField,
  ListContainer,
} from '../components'
import { color } from '../artifacts/colors'
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { useLocation, useParams } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { currentReceipt } from '../redux/CardReducer'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from './errorpages/error'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ViewReceipt() {
  const { id } = useParams()
  const pathname = useLocation().pathname.substring(0, 15)
  const dispatch = useDispatch()

  const getBatch = useCallback(async () => {
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
        let dataObj = {
          batchProvisionHeader: header,
          cardsReceipt: receiptInfo,
        }
        dispatch(currentReceipt({ data: dataObj }))
      } else {
        toast.error(response.status + ': not successful')
      }
    } catch (e) {
      return toast.error('Could not complete the last action')
      // console.log(e)
    }
  }, [pathname, dispatch, id])
  // getBatch()
  const edit = async () => {
    try {
      await Axios.post(
        `/Provisioning/updateCardProvisionHeaderByBatchNo?batchno=${id}&status=${1}`,
      )
      toast.success('successfully edited')
    } catch (e) {
      toast.error('could not successfuly edit card')
    }
  }
  const { Cards } = useSelector((state) => state as IrootState)
  const { receipt } = Cards
  let batchProvisionHeader = receipt?.batchProvisionHeader
  let cardsReceipt = receipt?.cardsReceipt
  // console.log(batchProvisionHeader, receipt, 'batch provisioned header')
  console.log(batchProvisionHeader?.receivedBy,"receivedby")
  useEffect(() => {
    getBatch()
  }, [getBatch])

  return (
    <ErrorBoundary FallbackComponent={FallbackRender} onReset={(details) => {}}>
      <div className="p-2">
        <h2>Details page</h2>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md absolute right-0 mr-10"
          onClick={edit}
        >
          Edit
        </button>
        <div className=" flex flex-wrap justify-start">
          <label className="min-w-[200px] p-3  font-bold flex">
            Batch no:
            <input
              className="border-b-2"
              type="text"
              value={batchProvisionHeader?.batchNo}
              readOnly
            />
          </label>
          <label className="min-w-[200px] p-3 font-bold flex">
            No of Cards:
            <input
              className="border-b-2"
              type="text"
              value={cardsReceipt?.length}
              readOnly
            />
          </label>
          <label className="min-w-[200px] p-3 font-bold flex">
            Date Created:
            <input
              className="border-b-2"
              type="date"
              value={batchProvisionHeader?.dateCreated?.substring(0, 10)}
              readOnly
            />
          </label>

          <label className="min-w-[200px] p-3 font-bold flex">
            {' '}
            Date Provissioned:
            <input
              className="border-b-2"
              type="date"
              value={batchProvisionHeader?.provisionedOn?.substring(0, 10)}
              readOnly
            />
          </label>

          <label className="min-w-[200px] p-3 font-bold flex">
            ReceivedBy:
            <input
              className="border-b-2"
              type="text"
              value={batchProvisionHeader?.receivedBy}
              readOnly
            />
          </label>

          <label className="min-w-[180px] p-3 font-bold flex">
            DeliveredBy:
            <input
              className="border-b-2"
              type="text"
              value={batchProvisionHeader?.deliveredBy}
              readOnly
            />
          </label>
        </div>
        <ListContainer
          title="cards in this Receipt"
          batchStatus={batchProvisionHeader?.submissionstatus}
          list={cardsReceipt}
        />
      </div>

      <ToastContainer position="bottom-right" newestOnTop />
    </ErrorBoundary>
  )
}

export default ViewReceipt
