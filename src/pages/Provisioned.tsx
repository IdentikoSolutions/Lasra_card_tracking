import React, { memo, useEffect, useState,useCallback } from 'react'
import { Flip, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  ListContainer, ReportACard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
// import { color } from '../artifacts/colors'
import { Aside } from '../components/Aside'
import { Axios } from '../Axios/Axios'
// import { OverlayCard } from '../styles/styles'
// import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { reportACard } from '../redux/CardReducer'
import { PrintPdf } from '../components/pdfRender'
import { button, overlay } from '../styles/styles'

export function Provisioned() {
  const [active, toggle] = useState(false)
  const dispatch = useDispatch()
  const { setPageName,printRef } = useApp() as any
  setPageName('Card Provisioning Page')
  const [search, setSearch] = useState({
    batch: 0,
    pageSize: 20,
    currentPage: 0,
  })
  const [receiptDetail, setReceiptDetail] = useState({
    date: '',
    receivedBy: '',
    deliveredBy: '',
  })
  const [receipts, setReceipts] = useState([])
  const { cards, batchDetail, reports } = useSelector(
    (state) => state as IrootState,
  ).Cards
  const details = {
    batchId: batchDetail.batchNo,
    provisionedOn: receiptDetail.date,
    receivedOn: receiptDetail.date,
    receivedBy: receiptDetail.receivedBy,
    batchCardReceiptStatus: 0,
    deliveredBy: receiptDetail.deliveredBy,
    submissionStatus: 0,
    cards: cards.concat(reports).map((card) => ({
      cardId: card.cardId,
      status: card.status,
      comment: card.comment || '',
    })),
  }
  //save the state as cookie
  const setProvisioned = useCallback(() => {
  if(cards.length!==0){
  localStorage.setItem(
      'Provisioned',
      JSON.stringify({ cards, batchDetail, reports }),
    )
  } 
    const storedData = localStorage.getItem('Provisioned')
    if(storedData && cards.length===0) {
      dispatch(reportACard({...JSON.parse(storedData)}))
    }
  },[cards])
  // setProvisioned()
  const save = async () => {
    try {
      const response = await Axios.post(
        '/Provisioning/CreateBatchProvisioning',
        details,
      )
      localStorage.removeItem('Provisioned')
      toast.success('New provision receipt created successfully')
    } catch (e) {
      toast.error('Note: The provision receipt was not created.')
    }
  }
  const getProvisioned = useCallback(async()=> {
    try {
      const result = await Axios.get('/Provisioning/ViewAllProvisionedBatches')
      const data = result.data.map((datum: any) => datum.batchNo)
      setReceipts(data)
      return await result.data
    } catch (e) {
      throw new Error('Was not able to get provisioned batch')
    }
  },[])
  const handleSearch = (e: any) => {
    setSearch({ ...search, batch: e.target.value })
  }
  const submit = async () => {
    try {
      details.submissionStatus = 1
      await Axios.post('/Provisioning/CreateBatchProvisioning', details)
      localStorage.removeItem('Provisioned')
      toast.success('Completed the successfull')
    } catch (e) {

      toast.error(`Could not complete the operation. Detail: This batch has been provissioned`)
    }
  }
  useEffect(() => {
    getProvisioned()
    setProvisioned()
  }, [setProvisioned ])
  return (
    <div className=" overflow-scroll">
      <div>
      <PrintPdf title={'Provisioned cards'} >
        <div ref={printRef}>
        <h1 className='text-[2rem] text-center font-bold'>Card Provision</h1>

        {!active && (
          <div
            onClick={() => toggle(!active)}
            className={button+ " w-fit"}
          >
            {active ? 'close report' : 'open report'}
          </div>
        )}
<div>
<h2>Batch Details</h2>

        <div className="flex justify-evenly text-gray-600  w-[80%]">

          <div>
            <p className="mt-3 flex justify-between">
              <span>Batch No:</span> <span>{batchDetail?.batchNo}</span>
            </p>
            <p className="mt-3 flex justify-between">
              No of Cards: <span>{batchDetail?.noRecords}</span>
            </p>
            <p className="mt-3 flex justify-between">
              Date created:{' '}
              <span>{batchDetail?.bankDataCreatedOn?.substring(0, 10)}</span>
            </p>
          </div>
          <div className="flex-col flex">
            {/* <h2>Cards Received Details</h2> */}
            <label htmlFor="date" className="mt-3 flex justify-between">
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
            <label htmlFor="date" className="mt-3 flex justify-between">
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
            <label htmlFor="date" className="mt-3 flex justify-between">
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
        {cards.length > 0 && active && (
          <div className={overlay}>
            {active && (
              <button
              className={button +' m-2'}
                onClick={() => toggle(!active)}
              >{active ? 'close report' : 'open report'}</button>
            )}
            <ReportACard />
          </div>
        )}
        <ListContainer title="CARDS" list={cards} />
        {reports.length > 0 && (
          <ListContainer width={''} title="FAILED CARDS" list={reports} />
        )}
        </div>
        </PrintPdf>
      </div>
      <Aside />
      <div className='flex justify-center'>
      <button className={button+" m-3"} onClick={save} >Save</button>
      <button className={button+' m-3'} onClick={submit}>Submit</button>

      </div>
     
      <ToastContainer position="bottom-right" newestOnTop transition={Flip} />
    </div>
  )
}
export default Provisioned
