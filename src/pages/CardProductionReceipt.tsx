import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ListContainer,
  ReportACard,
} from '../components'
import { IoSaveSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
// import { useDispatch } from 'react-redux'
// import { IrootState } from '../redux/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { Aside } from '../components/Aside'
import { useApp } from '../context/AppContext'
import { PrintPdf } from '../components/pdfRender'
import { button, overlay } from '../styles/styles'
import { getCardCountByStatus, createNewReceipt } from "../services";
export { }

function CardProductionReceipt() {
  const location = useLocation()
  const { batchNo } = location.state
  const [selectedValue, setSelectedValue] = useState(true);

  // console.log(batchNo, "from state")
  const { setPageName, printRef } = useApp() as any
  setPageName('Card Production Page')
  // const dispatch = useDispatch()
  // let { Cards } = useSelector((state) => {
  //   return state as IrootState
  // })
  const [active, toggle] = useState(false)
  // const navigate = useNavigate()
  // receivedStatus: number;
  // receivedBy: string;
  // receivedAt: Date;
  // batchNo: string;
  // cardReceipt: CreateCardReceiptDto[];
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value === 'true');
  };

  // const { reports, cards, batchDetail } = Cards
  const [card, setCard] = useState<any[]>([])
  const [receiptDetail, setReceiptDetail] = useState<any>({
    batchNo,
    receivedStatus: 0,
    receivedBy: '',
    receivedAt: '',
    cardReceipt: card.map(card => card.lassraId)
  })
  const fetchNotReceivedCard =
    async () => {
      const result = await getCardCountByStatus(receiptDetail.batchNo, 0)
      const card = result[0].map(card => ({lassraId:card.lassraId}))
      setCard(result[0])
      //  setReceiptDetail(re)
      //  console.log(result)
    }
  const save = async () => {
    const response = await createNewReceipt(receiptDetail)
    // localStorage.removeItem('Receipt')
    try {

      console.log(response, "from save")
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
      receiptDetail.submissionStatus = 1
      const result = createNewReceipt(receiptDetail)
      console.log(result)
      // localStorage.removeItem('Receipt');
      toast.success(<h3>Submitted successfully</h3>)
    } catch (e) {
      toast.error(
        <>
          <h3>Error occured</h3> <p>Erro: can not create a receipt at this time pls try again</p>
        </>,
      )
    }
  }
  useEffect(() => {
    const cardreceipt = card.map(card => ({lassraId:card.lassraId}))
    setReceiptDetail({ ...receiptDetail, cardReceipt: cardreceipt })

  }, [card])
  return (
    <div className='transparent w-full flex-col flex-1'>
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
                  <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 justify-evenly text-gray-600 p-2 m-2  w-full self-center bg-white shadow-sm">

                    <div className='md:col-span-1 lg:cols-span-2 xxl:cols-span-2  items-evenly h-full'>
                      <div className="text-gray-500 m-auto flex justify-between flex-1">
                        <span className='font-bold'>Batch No: </span><span>{receiptDetail.batchNo}</span>
                      </div>
                      <p className="flex m-auto justify-between"> <p className=" font-bold">
                        No of Cards:</p> <span>{receiptDetail.cardReceipt?.length}</span></p>

                    </div>
                    <div className="  ">
                      {/* <h2>Cards Received Details</h2> */}
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

                    <ReportACard />
                  </div>
                )}
                <div className='grid grid-cols-2 gap-4 mb-4'>

                  <button className={button} onClick={fetchNotReceivedCard}>fetch cards</button>
                  <button className={button}>Enter Card </button>
                </div>
                <input
          type="radio"
          id="true"
          name="selection"
          value="true"
          checked={selectedValue === true}
          onChange={handleRadioChange}
        />
        <label htmlFor="true">Show Component A</label>               { card.length>0 && <ListContainer title="CARDS" list={card} />}

              </div>
            }
          </div>
        </PrintPdf>

        <Aside />
      </div>

      <ToastContainer position="top-right" newestOnTop />
      {
        card.length>0 &&<div className='flex justify-center'>
          <button className={button + ' mx-2'} onClick={save} ><IoSaveSharp className={' mx-2'} />
            Save</button>
          <button className={button + ' mx-2'} onClick={submit}>Submit<RiSendPlaneFill className={' mx-2'} />
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
// function createNewReceipt(details: any) {
//   throw new Error('Function not implemented.');
// }

