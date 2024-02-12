import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ListContainer,
  ReportACard,
} from '../components'
import { IoSaveSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
// import { OverlayCard } from '../styles/styles'
// import { color } from '../artifacts/colors'
import { Axios } from '../Axios/Axios'
import { useNavigate } from 'react-router-dom'
import { reportACard, updateCard } from '../redux/CardReducer'
import { Aside } from '../components/Aside'
import { useApp } from '../context/AppContext'
import { PrintPdf } from '../components/pdfRender'
import { button, overlay } from '../styles/styles'
export { }

function CardProductionReceipt() {
  const { setPageName, printRef } = useApp() as any
  setPageName('Card Production Page')
  const dispatch = useDispatch()
  let { Cards } = useSelector((state) => {
    return state as IrootState
  })
  const [active, toggle] = useState(false)
  const navigate = useNavigate()

  const { reports, cards, batchDetail } = Cards
  const [receiptDetail, setReceiptDetail] = useState({
    date: '',
    receivedBy: '',
    deliveredBy: '',
  })

  const details = {
    batchId: batchDetail.batchNo,
    cardreceivedOn: receiptDetail.date,
    receivedOn: receiptDetail.date,
    receivedBy: receiptDetail.receivedBy,
    batchCardReceiptStatus: 0,
    deliveredBy: receiptDetail.deliveredBy,
    submissionStatus: 0,
    cards: cards.concat(reports).map((card) => ({
      cardId: card.id,
      status: card.status,
      comment: card.comment || '',
    })),
  }
  const setProvisioned = useCallback(() => {
    if (cards.length !== 0) {
      localStorage.setItem(
        'Receipt',
        JSON.stringify({ cards, batchDetail, reports }),
      )
    }
    const storedData = localStorage.getItem('Receipt')
    if (storedData && cards.length === 0) {
      dispatch(reportACard({ ...JSON.parse(storedData) }))
    }
  }, [cards])
  const save = async () => {
    try {
      await Axios.post('/Card/CreateCardReceipt', details)
      localStorage.removeItem('Receipt')
      toast.success('receipt created successfull')
    } catch (e: any) {
      toast.error(
        <>
          <h2>Request Failed</h2> <p>{e.message && e.message}</p>
        </>,
      )
    }
  }
  const submit = async () => {
    try {
      // save()
      details.submissionStatus = 1
      const result = await Axios.post('/Card/CreateCardReceipt', details)
      localStorage.removeItem('Receipt');
      // await Axios.post(`/Card/updateCardReceiptHeaderByBatchNo?batchno=${batchDetail.batchNo}&status=1`)
      toast.success(<h3>Submitted successfully</h3>)
    } catch (e) {
      toast.error(
        <>
          <h3>Error occured</h3> <p>Error Detail: Receipt already exist for batch {details.batchId}</p>
        </>,
      )
    }
  }
  useEffect(() => {
    setProvisioned()
  }, [Cards])
  return (
    <div className='transparent w-[79vw] flex-col '>
      <div className="flex relative  ">
        <PrintPdf title='card production' >

          <div ref={printRef} id="content" className='overflow-hidden '>
            {<h1 className='text-[2rem] text-center font-bold'>CARD PRODUCTION RECEIPT</h1>}
            <br />
            {
              <>
                {!active && (
                  <div
                    onClick={() => toggle(!active)}
                    // className="mb-4 shadow-sm w-fit px-4 mr-0 bg-green-100"
                    className={button + ' w-fit'}

                  >
                    {active ? 'close report' : 'open report'}
                  </div>
                )}
                <div>
                <h2>Batch Details</h2>
                <div className="flex justify-evenly text-gray-600 p-2 m-2  w-[80%] self-center bg-white">

                  <div className='flex-1 m-3 '>
                    <div className="text-gray-500 m-auto flex justify-between underline">
                      <span>Batch No: </span><span>{batchDetail?.batchNo}</span>
                    </div>
                    <p className="flex m-auto justify-between underline">
                      No of Cards: <span>{batchDetail?.noRecords}</span>
                    </p>
                    <p className="m-auto flex justify-between underline">
                      Date created:{' '}
                      <span>
                        {batchDetail?.bankDataCreatedOn?.substring(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-1 flex-col flex">
                    {/* <h2>Cards Received Details</h2> */}
                    <label htmlFor="date" className="mx-5 underline flex justify-between">
                      {' '}
                      Date received :
                      <input
                      className='p-1 border-b-2 mx-2'
                        type="date"
                        id="todayDate"
                        value={receiptDetail.date}
                        onChange={(e: any) =>
                          setReceiptDetail({
                            ...receiptDetail,
                            date: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label htmlFor="date" className="mx-5 underline flex justify-between">
                      {' '}
                      Received by :
                      <input
                        type="string"
                        value={receiptDetail.receivedBy}
                        className="border-b-[3px] border-l-[3px] ml-4"
                        onChange={(e: any) =>
                          setReceiptDetail({
                            ...receiptDetail,
                            receivedBy: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label htmlFor="date" className="mx-5 underline flex justify-between">
                      {' '}
                      Delivered by :
                      <input
                        type="date"
                        id="todayDate"
                        value={receiptDetail.deliveredBy}
                        onChange={(e: any) =>
                          setReceiptDetail({
                            ...receiptDetail,
                            deliveredBy: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                  </div>
                </div>
              </>
            }
            {
              <div className='overflow-scroll'>
                {cards.length > 0 && active && (
                  <div className={overlay}>
                    {active && (
                      <button
                        onClick={() => toggle(!active)}
                        className={button +' m-2'}
                      > 
                          {active ? 'close report' : 'open report'}</button>
                    )}

                    <ReportACard />
                  </div>
                )}

                <ListContainer title="CARDS" list={cards} />

              </div>
            }
          </div>
        </PrintPdf>

        <Aside />
      </div>

      <ToastContainer position="top-right" newestOnTop />
      {
        <div className='flex justify-center'>
          <button className={button+' mx-2'} onClick={save} ><IoSaveSharp className={' mx-2'}/>
Save</button>
          <button className={button +' mx-2'} onClick={submit}>Submit<RiSendPlaneFill className={' mx-2'}/>
</button>
          {/* <button onClick={() => generatePdf('#content')}>generatepdf</button> */}
        </div>
      }

      {/* </VariableGrid> */}
      {/* <Footer/> */}
    </div>
  )
}
export default CardProductionReceipt
