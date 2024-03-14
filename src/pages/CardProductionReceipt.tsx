import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { Formik } from 'formik'
import {
  ListContainer,
PrintPdf, Manual
} from '../components'
import { Tooltip } from './ReceiptDetailsPage'
// import { IoSaveSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { button, overlay } from '../styles/styles'
import { getCardCountByStatus, createNewReceipt } from "../services";
export { }

function CardProductionReceipt() {
  const location = useLocation()
  const { batchNo } = location.state
  const [manual, updateMode] = useState(true);
  const [currentView, setCurrentView] = useState(true);
  const { setPageName, printRef } = useApp() as any
  setPageName('Card Production Page')
  const [active, toggle] = useState(false)

  const [card, setCard] = useState<any[]>([])//hold list of xcard and all  thhe card details authomaticalyl populated
  const [manualBatch, setManualBatch] = useState<any[]>([])
  const [receiptDetail, setReceiptDetail] = useState<any>({
    batchNo,
    receivedStatus: 0,
    receivedBy: '',
    receivedAt: '',
    cardReceipt: card.length ? card.map(card => card?.lassraId) : []
  })
  const addCard = (lassraId) => {
    // console.log("addinfg " + lassraId)
  const cardtoremove = card.filter(card=>card.lassraId===lassraId)[0]
  const cardIndex =card.indexOf(cardtoremove)
  // console.log(cardIndex, cardtoremove, " card index")
  card[cardIndex].include = true;
// console.log(card,"card after")
  setCard(card)
  }
  const removeCard = (lassraId) => {
    const updatedCard = card.map((item) => {
      if (item.lassraId === lassraId) {
        return { ...item, include: false }
      } else {
        return item
      }
    })
    setCard(updatedCard)
  }
  const selectedCardList = card.filter(cards => cards.include === true)
  const notSelectedCard = card.filter(cards => cards.include === false)
  const updateCardReceipt = () => {
    //list of selected cards in automatically populated list
    const cardreceipt = card.filter(card => card.include === true)
    //determines which list to use to generate receive.dependes of mode
    const list = card.length > 0 ? cardreceipt : manualBatch.length > 0 ? manualBatch : []
    console.log(list, "my list")
    //final list for receipt
    const receiptIds = list.map(card => ({ lassraId: card.lassraId }))
    setReceiptDetail({ ...receiptDetail, cardReceipt: receiptIds })
  }
  const fetchNotReceivedCard = async () => {
    const result = await getCardCountByStatus(receiptDetail.batchNo, 0)
    const cardform = result[0].map(card => ({ ...card, include: true }))
    setCard(cardform)
  }

  // const save = async () => {
  //   const response = await createNewReceipt(receiptDetail)
  //   try {
  //     console.log(response, "from save")
  //     toast.success('receipt created successfull')
  //   } catch (e: any) {
  //     toast.error(
  //       <>
  //         <h2>Request Failed</h2> <p>{e.message && e.message}</p>
  //       </>,
  //     )
  //   }
  // }
  const submit = async () => {
    if(receiptDetail.receivedAt===''||receiptDetail.receivedBy==='') {
      toast.warn("make sure all neccessary fields are filled")
      return
    }
    try {
      // receiptDetail.submissionStatus = 1
      const result = createNewReceipt(receiptDetail)
      console.log(result)
      toast.success(<h3>Submitted successfully</h3>)
    } catch (e) {
      toast.error(
        <>
          <h3>Error occured</h3> <p>Erro: can not create a receipt at this time pls try again</p>
        </>,
      )
    }
  }
  const setAuthomatic = () => {
    updateMode(!manual)
    setManualBatch([])

  }
  const setManual = () => {
    updateMode(!manual)
    setCard([])
  }

  useEffect(() => {
    updateCardReceipt()
    console.log(selectedCardList,notSelectedCard,"myCardList")
  }, [card, manualBatch, currentView, selectedCardList, notSelectedCard])
  return (
    <div className='transparent w-full flex-col flex-1'>
      <div className="flex relative  ">
        <PrintPdf title='card production' >
          <div ref={printRef} id="content" className='overflow-hidden '>
            {<h1 className='text-[2rem] text-center font-bold'>CARD PRODUCTION RECEIPT</h1>}
            <br />
            {
              <>
                {/* {!active && (
                  <div
                    onClick={() => toggle(!active)}
                    className={button + ' w-fit'}
                  >
                    {active ? 'close report' : 'open report'}
                  </div>
                )} */}
                <div>
                  <h2>Batch Details</h2>
                  <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 justify-evenly text-gray-600 p-2 m-2  w-full self-center bg-white shadow-sm">
                    <div className='md:col-span-1 lg:cols-span-2 xxl:cols-span-2  items-evenly h-full'>
                      <div className="text-gray-500 m-auto flex justify-between flex-1">
                        <span className='font-bold'>Batch No: </span><span>{receiptDetail.batchNo}</span>
                      </div>
                      <p className="flex m-auto justify-between"> <p className=" font-bold">
                        No of Cards:</p> <span>{receiptDetail.cardReceipt?.length}</span></p>
                    </div>
                    <div className="  ">
                      <label htmlFor="date" className="mx-5 grid grid-cols-2 gap-1 justify-between w-full">
                        Received At :
                        <input
                          className='p-1 border-b-2 mx-2'
                          type="date"
                          id="todayDate"
                          value={receiptDetail.receivedAt}
                          onChange={(e: any) =>
                            setReceiptDetail({
                              ...receiptDetail,
                              receivedAt: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label htmlFor="date" className="mx-5 grid grid-cols-2 gap-2 w-full">
                        {' '}
                        Received by :
                        <input
                          type="string"
                          value={receiptDetail.receivedBy}
                          className="shadow-sm"
                          onChange={(e: any) =>
                            setReceiptDetail({
                              ...receiptDetail,
                              receivedBy: e.target.value,
                            })
                          }
                        />
                      </label>
                      {/* ///////// */}
                    </div>
                  </div>
                </div>
              </>
            }
            {
              <div className='overflow-scroll'>
                {receiptDetail.cardReceipt?.length > 0 && active && (
                  <div className={overlay}>
                    {active && (
                      <button
                        onClick={() => toggle(!active)}
                        className={button + ' m-2'}
                      >
                        {active ? 'close report' : 'open report'}</button>
                    )}
                    {/* <ReportACard /> */}
                  </div>
                )}
                <div className='grid grid-cols-2 gap-2 mb-4'>
                  {manual && !card.length && <button className={button} onClick={fetchNotReceivedCard}>fetch cards</button>}
                  {/* {!manual && <button className={button}>Enter Card </button>} */}
                  {!manual && <button className={button} onClick={setAuthomatic}>Polulate automatically</button>}
                  {manual && <button className={button} onClick={setManual}>Enter manualy</button>}
                  {manual&&card.length>0&& <button onClick={() => setCurrentView(!currentView)} className={button+ " max-w-fit"}>{!currentView ? "View selected" : "View Not received"}</button>
}
                </div>
                {manual && card.length > 0
                  && <>
                    {/* <button onClick={() => setCurrentView(!currentView)} className={button}>{!currentView ? "View selected" : "View Not received"}</button> */}
                    {currentView ?
                     <ListContainer title="Selected Cards" list={selectedCardList}  remove={removeCard} /> 
                    : <ListContainer title="Removed Cards (Not Received)" list={notSelectedCard} add={addCard}  />}
                  </>}
                {!manual && <Manual manualbatch={manualBatch} updateCards={setManualBatch} batchNo={batchNo} />}
              </div>
            }
          </div>
        </PrintPdf>
        {/* <Aside /> */}
      </div>
      <ToastContainer position="top-right" newestOnTop />
      {
        (card.length > 0 || manualBatch.length > 0) && <div className='flex justify-center'>
          {/* <button className={button + ' mx-2'} onClick={save} ><IoSaveSharp className={' mx-2'} />
            Save</button> */}
          <button className={button + ' mx-2'} onClick={submit}>Submit<RiSendPlaneFill className={' mx-2'} />
          <Tooltip message={"clicking subm it will create the receipt"}/>
          </button>
        </div>
      }
    </div>
  )
}
export default CardProductionReceipt