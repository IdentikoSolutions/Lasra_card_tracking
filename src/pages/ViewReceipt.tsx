'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ListContainer, Reports
} from '../components'
// import { color } from '../artifacts/colors'
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { useLocation, useParams, } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { currentReceipt } from '../redux/CardReducer'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from './errorpages/error'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ViewReceipt() {
  const { id } = useParams()
  const location = useLocation()
  const incomingReceipt = location.state?.receipt
  const pathname = location.pathname.substring(0, 15)
  const dispatch = useDispatch()
  const batchid = location.search.split('=')[1]
  const [show, toggleShow] = useState(false)
  const [showCards, toggleShowCards] = useState(false)
  const urlParams = new URLSearchParams(window.location.search);
  const receiptId = urlParams.get('receiptId');
  console.log(receiptId);
  const getBatch = useCallback(async () => {
    let endpoint
    if (pathname === '/receipts/cards') {
      // endpoint = '/Card/ViewCardReceiptByBatchId?BatchNo='
      endpoint = 'receipt/'
    } else if (pathname === '/receipts/recei') {
      endpoint = '/Provisioning/ViewAllProvisionedBatchesById?id='
    }
    try {
      const response = await Axios.get(`${endpoint}${receiptId}`)
      console.log(response, "response")
      if (response.status === 200) {
        const { data } = response
        const header = data//.cardReceiptHeader || data.batchProvisionHeader
        const receiptInfo = data.cardReceipt || data.cardsProvisioned
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
  const reportdata = [
    { name: 'Total Cards', value: incomingReceipt?.noRecords },
    { name: 'Total received', value: incomingReceipt?.received },
    { name: 'Total Not received', value: incomingReceipt?.notReceived }
  ]
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
  console.log(batchProvisionHeader?.receivedBy, "receivedby")
  useEffect(() => {
    getBatch()
  }, [getBatch])

  return (
    <ErrorBoundary FallbackComponent={FallbackRender} onReset={(details) => { }}>
      <div className="p-2">
        <button className='hover:text-red-400 hover:underline'
          onClick={() => toggleShow(!show)}>{show
            ? 'Show' : "Hide "} Details</button>

        {/* {show ?
          <Reports reportData={reportdata} /> : */}
        <>
          <h2>Details page</h2>
          <div className='flex-col flex '>
            {!showCards && <div className="grid grid-cols-2 gap-4 bg-white p-3 shadow-md mb-2">

              <div className="min-w-[200px]  justify-between text-slate-400 flex">
                Batch no:
                <p className="text-gray-700 text-bold"
                >{batchProvisionHeader?.batchNo}</p>
              </div>
              <div className="min-w-[200px]  justify-between text-slate-400 flex">
                No of Cards:
                <p className="text-gray-700"
                >{cardsReceipt?.length}</p>
              </div>

              <div className="min-w-[200px]  justify-between text-slate-400 flex">
                Date Created:
                <p className="text-gray-700"
                >{batchProvisionHeader?.createdAt?.substring(0, 10)}</p>
              </div>

              <div className="min-w-[200px] justify-between text-slate-400 flex">
                Date Provissioned:
                <p className="text-gray-700"
                >{batchProvisionHeader?.provisionedOn?.substring(0, 10)}</p>
              </div>


              <div className="min-w-[200px] justify-between text-slate-400 flex">
                ReceivedBy:
                <p className="text-gray-700"
                >{batchProvisionHeader?.receivedBy}</p>
              </div>
              <div className="min-w-[200px] justify-between text-slate-400 flex">
                DeliveredBy:
                <p className="text-gray-700"
                >{batchProvisionHeader?.deliveredBy}</p>
              </div>
            </div>
            }
            <div className='self-end flex'>
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-sm m-2"
                onClick={edit}
              >
                Edit
              </button>
              <div className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-sm  m-2 shadow-lg shadow-zinc-950 "
                onClick={() => toggleShowCards(!showCards)}>{showCards ? "View Summary" : "View Cards"}</div>
            </div>

          </div>
          {showCards && <ListContainer
            title="cards in this Receipt"
            batchStatus={batchProvisionHeader?.submissionstatus}
            list={cardsReceipt}
          />}
        </>
        {/* } */}
      </div>

      <ToastContainer position="bottom-left" newestOnTop />
    </ErrorBoundary>
  )
}

export default ViewReceipt
