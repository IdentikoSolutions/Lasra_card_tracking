
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ListContainer,
PrintPdf, Manual
} from '../components'
import { Tooltip } from './ReceiptDetailsPage'
import { RiSendPlaneFill } from "react-icons/ri";
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { button, overlay } from '../styles/styles'
import { getCardCountByStatus, createNewProvision } from "../services";
export { }

function Provisioned() {
  const location = useLocation()
  const { batchNo } = location.state
  const [manual, updateMode] = useState(true);
  const [currentView, setCurrentView] = useState(true);
  const { setPageName, printRef } = useApp() as any
  setPageName('Card Provisoning Page')
  const [active, toggle] = useState(false)

  const [card, setCard] = useState<any[]>([])//hold list of xcard and all  thhe card details authomaticalyl populated
  const [manualBatch, setManualBatch] = useState<any[]>([])
  const [provisionDetail, setProvisionDetail] = useState<any>({
    batchNo,
    provisionedBy: '',
    provisioneAt: '',
    cardProvision: card.length ? card.map(card => card?.lassraId) : []
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
    const cardProvision = card.filter(card => card.include === true)
    //determines which list to use to generate receive.dependes of mode
    const list = card.length > 0 ? cardProvision : manualBatch.length > 0 ? manualBatch : []
    // console.log(list, "my list")
    //final list for receipt
    const provisionIds = list.map(card => ({ lassraId: card.lassraId }))
    setProvisionDetail({ ...provisionDetail, cardProvision: provisionIds })
  }
  const fetchReceivedCard = async () => {
    const result = await getCardCountByStatus(provisionDetail.batchNo, 1)
    const cardform = result[0].map(card => ({ ...card, include: true }))
    setCard(cardform)
  }

  const submit = async () => {
    if(provisionDetail.provisionedAt===''||provisionDetail.provisionedBy==='') {
      toast.warn("make sure all neccessary fields are filled")
      return
    }
    try {
      // receiptDetail.submissionStatus = 1
      const result = await createNewProvision(provisionDetail)
      console.log(result)
      if(result.status===200){
        toast.success(<h3>Submitted successfully</h3>)

      }else{
        console.log(result.statusText, "status Text")
        toast.error(<h3>{ result.statusText}</h3>)

      }
    } catch (e) {
      console.log(e,'Error')
      toast.error(
        <>
          <h3>Error occured</h3> <p>Duplication error. You are trying to create a receive with card(s)  that has been received.</p>
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
    // console.log("myCardList")
  }, [card,manual, manualBatch, currentView,selectedCardList,notSelectedCard])
  return (
    <div className='transparent w-full flex-col flex-1'>
      <div className="flex relative  ">
        <PrintPdf title='card production' >
          <div ref={printRef} id="content" className='overflow-hidden '>
            {<h1 className='text-[2rem] text-center font-bold'>CARD PROVISIONING RECEIPT</h1>}
            <br />
            {
              <>
                <div>
                  <h2>Batch Details</h2>
                  <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 justify-evenly text-gray-600 p-2 m-2  w-full self-center bg-white shadow-sm">
                    <div className='md:col-span-1 lg:cols-span-2 xxl:cols-span-2  items-evenly h-full'>
                      <div className="text-gray-500 m-auto flex justify-between flex-1">
                        <span className='font-bold'>Batch No: </span><span>{provisionDetail.batchNo}</span>
                      </div>
                      <p className="flex m-auto justify-between"> <p className=" font-bold">
                        No of Cards:</p> <span>{provisionDetail.cardProvision?.length}</span></p>
                    </div>
                    <div className="  ">
                      <label htmlFor="date" className="mx-5 grid grid-cols-2 gap-1 justify-between w-full">
                        Provisioned At :
                        <input
                          className='p-1 border-b-2 mx-2'
                          type="date"
                          id="todayDate"
                          value={provisionDetail.provisionedAt}
                          onChange={(e: any) =>
                            setProvisionDetail({
                              ...provisionDetail,
                              provisionedAt: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label htmlFor="date" className="mx-5 grid grid-cols-2 gap-2 w-full">
                        {' '}
                        Provisioned by :
                        <input
                          type="string"
                          value={provisionDetail.provisionedBy}
                          className="shadow-sm"
                          onChange={(e: any) =>
                            setProvisionDetail({
                              ...provisionDetail,
                              provisionedBy: e.target.value,
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
                {provisionDetail.cardProvision?.length > 0 && active && (
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
                  {manual && !card.length && <button className={button} onClick={fetchReceivedCard}>fetch cards</button>}
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
export default Provisioned
// import React, { memo, useEffect, useState,useCallback } from 'react'
// import { Flip, ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import {  ListContainer, ReportACard } from '../components'
// import { useDispatch, useSelector } from 'react-redux'
// import { IrootState } from '../redux/store'
// // import { color } from '../artifacts/colors'
// import { Aside } from '../components/Aside'
// import { Axios } from '../Axios/Axios'
// // import { OverlayCard } from '../styles/styles'
// // import { useNavigate } from 'react-router-dom'
// import { useApp } from '../context/AppContext'
// import { reportACard } from '../redux/CardReducer'
// import { PrintPdf } from '../components/pdfRender'
// import { button, overlay } from '../styles/styles'

// export function Provisioned() {
//   const [active, toggle] = useState(false)
//   const dispatch = useDispatch()
//   const { setPageName,printRef } = useApp() as any
//   setPageName('Card Provisioning Page')
//   const [search, setSearch] = useState({
//     batch: 0,
//     pageSize: 20,
//     currentPage: 0,
//   })
//   const [receiptDetail, setReceiptDetail] = useState({
//     date: '',
//     receivedBy: '',
//     deliveredBy: '',
//   })
//   const [receipts, setReceipts] = useState([])
//   const { cards, batchDetail, reports } = useSelector(
//     (state) => state as IrootState,
//   ).Cards
//   const details = {
//     batchId: batchDetail.batchNo,
//     provisionedOn: receiptDetail.date,
//     receivedOn: receiptDetail.date,
//     receivedBy: receiptDetail.receivedBy,
//     batchCardReceiptStatus: 0,
//     deliveredBy: receiptDetail.deliveredBy,
//     submissionStatus: 0,
//     cards: cards.concat(reports).map((card) => ({
//       cardId: card.cardId,
//       status: card.status,
//       comment: card.comment || '',
//     })),
//   }
//   //save the state as cookie
//   const setProvisioned = useCallback(() => {
//   if(cards.length!==0){
//   localStorage.setItem(
//       'Provisioned',
//       JSON.stringify({ cards, batchDetail, reports }),
//     )
//   } 
//     const storedData = localStorage.getItem('Provisioned')
//     if(storedData && cards.length===0) {
//       dispatch(reportACard({...JSON.parse(storedData)}))
//     }
//   },[cards])
//   // setProvisioned()
//   const save = async () => {
//     try {
//       const response = await Axios.post(
//         '/Provisioning/CreateBatchProvisioning',
//         details,
//       )
//       localStorage.removeItem('Provisioned')
//       toast.success('New provision receipt created successfully')
//     } catch (e) {
//       toast.error('Note: The provision receipt was not created.')
//     }
//   }
//   const getProvisioned = useCallback(async()=> {
//     try {
//       const result = await Axios.get('/Provisioning/ViewAllProvisionedBatches')
//       const data = result.data.map((datum: any) => datum.batchNo)
//       setReceipts(data)
//       return await result.data
//     } catch (e) {
//       throw new Error('Was not able to get provisioned batch')
//     }
//   },[])
//   const handleSearch = (e: any) => {
//     setSearch({ ...search, batch: e.target.value })
//   }
//   const submit = async () => {
//     try {
//       details.submissionStatus = 1
//       await Axios.post('/Provisioning/CreateBatchProvisioning', details)
//       localStorage.removeItem('Provisioned')
//       toast.success('Completed the successfull')
//     } catch (e) {

//       toast.error(`Could not complete the operation. Detail: This batch has been provissioned`)
//     }
//   }
//   useEffect(() => {
//     getProvisioned()
//     setProvisioned()
//   }, [setProvisioned ])
//   return (
//     <div className=" overflow-scroll">
//       <div>
//       <PrintPdf title={'Provisioned cards'} >
//         <div ref={printRef}>
//         <h1 className='text-[2rem] text-center font-bold'>Card Provision</h1>

//         {!active && (
//           <div
//             onClick={() => toggle(!active)}
//             className={button+ " w-fit"}
//           >
//             {active ? 'close report' : 'open report'}
//           </div>
//         )}
// <div>
// <h2>Batch Details</h2>

//         <div className="flex justify-evenly text-gray-600  w-[80%]">

//           <div>
//             <p className="mt-3 flex justify-between">
//               <span>Batch No:</span> <span>{batchDetail?.batchNo}</span>
//             </p>
//             <p className="mt-3 flex justify-between">
//               No of Cards: <span>{batchDetail?.noRecords}</span>
//             </p>
//             <p className="mt-3 flex justify-between">
//               Date created:{' '}
//               <span>{batchDetail?.bankDataCreatedOn?.substring(0, 10)}</span>
//             </p>
//           </div>
//           <div className="flex-col flex">
//             {/* <h2>Cards Received Details</h2> */}
//             <label htmlFor="date" className="mt-3 flex justify-between">
//               {' '}
//               Date received :
//               <input
//                 type="date"
//                 id="todayDate"
//                 value={receiptDetail.date}
//                 onChange={(e: any) =>
//                   setReceiptDetail({
//                     ...receiptDetail,
//                     date: e.target.value,
//                   })
//                 }
//               />
//             </label>
//             <label htmlFor="date" className="mt-3 flex justify-between">
//               {' '}
//               Received by :
//               <input
//                 type="string"
//                 value={receiptDetail.receivedBy}
//                 className="border-b-[3px] border-l-[3px] ml-4"
//                 onChange={(e: any) =>
//                   setReceiptDetail({
//                     ...receiptDetail,
//                     receivedBy: e.target.value,
//                   })
//                 }
//               />
//             </label>
//             <label htmlFor="date" className="mt-3 flex justify-between">
//               {' '}
//               Delivered by :
//               <input
//                 type="date"
//                 id="todayDate"
//                 value={receiptDetail.deliveredBy}
//                 onChange={(e: any) =>
//                   setReceiptDetail({
//                     ...receiptDetail,
//                     deliveredBy: e.target.value,
//                   })
//                 }
//               />
//             </label>
//           </div>
//           </div>
//         </div>
//         {cards.length > 0 && active && (
//           <div className={overlay}>
//             {active && (
//               <button
//               className={button +' m-2'}
//                 onClick={() => toggle(!active)}
//               >{active ? 'close report' : 'open report'}</button>
//             )}
//             <ReportACard />
//           </div>
//         )}
//         <ListContainer title="CARDS" list={cards} />
//         {reports.length > 0 && (
//           <ListContainer width={''} title="FAILED CARDS" list={reports} />
//         )}
//         </div>
//         </PrintPdf>
//       </div>
//       <Aside />
//       <div className='flex justify-center'>
//       <button className={button+" m-3"} onClick={save} >Save</button>
//       <button className={button+' m-3'} onClick={submit}>Submit</button>

//       </div>
     
//       <ToastContainer position="bottom-right" newestOnTop transition={Flip} />
//     </div>
//   )
// }
// export default Provisioned
