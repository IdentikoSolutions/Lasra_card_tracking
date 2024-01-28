import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ListContainer,
  ButtonElement,
  ReportACard,
} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { OverlayCard } from '../styles/styles'
import { color } from '../artifacts/colors'
import { Axios } from '../Axios/Axios'
import { useNavigate } from 'react-router-dom'
import { reportACard, updateCard } from '../redux/CardReducer'
import { Aside } from '../components/Aside'
import { useApp } from '../components/context/AppContext'
import { PrintPdf } from '../Axios/helpers/pdfRender'
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

          <div ref={printRef} id="content" className='overflow-hidden p-5 m5'>
            {<h1>CARD PRODUCTION RECEIPT</h1>}
            <br />
            {
              <>
                {!active && (
                  <div
                    onClick={() => toggle(!active)}
                    className="mb-4 shadow-sm w-fit px-4 mr-0 bg-green-100"
                  >
                    {active ? 'close report' : 'open report'}
                  </div>
                )}
                <div className="flex justify-evenly text-gray-600 mt-5">
                  <div>
                    <h2>Batch Details</h2>
                    <p className="mt-3">
                      Batch No: <span>{batchDetail?.batchNo}</span>
                    </p>
                    <p className="mt-3">
                      No of Cards: <span>{batchDetail?.noRecords}</span>
                    </p>
                    <p className="mt-3">
                      Date created:{' '}
                      <span>
                        {batchDetail?.bankDataCreatedOn?.substring(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-col flex">
                    <h2>Cards Received Details</h2>
                    <label htmlFor="date" className="mt-3">
                      {' '}
                      Date received :
                      <input
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
                    <label htmlFor="date" className="mt-3">
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
                    <label htmlFor="date" className="mt-3">
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
              </>
            }
            {
              <>
                {cards.length > 0 && active && (
                  <OverlayCard>
                    {active && (
                      <ButtonElement
                        label={active ? 'close report' : 'open report'}
                        onClick={() => toggle(!active)}
                      />
                    )}

                    <ReportACard />
                  </OverlayCard>
                )}

                <ListContainer title="CARDS" list={cards} />

              </>
            }
          </div>
        </PrintPdf>

        <Aside />
      </div>

      <ToastContainer position="top-right" newestOnTop />
      {
        <>
          <button className='bg-green-600 px-5 py-2 rounded-md text-white mb-10 m-3' onClick={save} >Save</button>
          <button className='bg-green-600 px-5 py-2 rounded-md text-white mb-10 m-3' onClick={submit}>Submit</button>
          {/* <button onClick={() => generatePdf('#content')}>generatepdf</button> */}
        </>
      }

      {/* </VariableGrid> */}
      {/* <Footer/> */}
    </div>
  )
}
export default CardProductionReceipt
