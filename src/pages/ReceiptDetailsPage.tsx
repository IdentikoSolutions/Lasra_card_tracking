import React, { useCallback, useEffect, useState } from 'react'
import { getReceiptsNos, getCardCountByStatus, searchBatchByParams, getCardsAndCount } from '../services/'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { FaEye } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";

import 'react-toastify/dist/ReactToastify.css'
import { HiFilter } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { VscDebugContinue } from "react-icons/vsc";
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { button, tableIcons } from '../styles/styles'
import BatchDetail from '../components/ListItemsComponent/BatchDetail'
import { useListPath, useReceiptPath, useSearchApi } from '../Axios/helpers/customHooks';
import { AxiosResponse } from 'axios'
import { Reports } from '../components';
export type searchResults = {
  result: receipt[],
  count: number
}
export type receipt = {
  id: number,
  batchNo: string,
  receivedStatus: number,
  receivedBy: string,
  receivedAt: Date,
  createdAt: Date
}
export const ReceiptDetailsPage = () => {

  const navigate = useNavigate()
  const [batchNo, setBatchNo] = useState('')
  const [searchParams, setSearchParams] = useState({ batchNo: '', jobNo: '', cardNo: "", page: '1', pageSize: '10' })
  const [searchResult, updateSearch] = useState<any>({})
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [batchDetail, setBatchDetail] = useState<any>({})
  const [showReceipt, toggleShowReceipt] = useState(false)
  // const reset = () => {
  //   toggleShowReceipt(false);
  //   setToggle(false);
  // }
  const callSearch = useCallback(
    async () => {
      const result = await searchBatchByParams(searchParams) as AxiosResponse<any, any>
      if (!result?.data) return
      const data = result.data
      const received = await getCardCountByStatus(data.batchNo, 1)
      data.received = received[1]
      const notReceived =await getCardCountByStatus(data.batchNo, 0)
      data.notReceived = notReceived[1]
      updateSearch(data)
    }, [searchParams])


  const getBatchDetail = async () => {
    if (!batchNo) return
    const result = await searchBatchByParams({ batchNo }) as any
    const { data } = result
    const received = await getCardCountByStatus(data.batchNo, 1)
    data.received = received[1]
    const notReceived =await getCardCountByStatus(data.batchNo, 0)
    data.notReceived = notReceived[1]
    // console.log(received,notReceived, "from setBatchdetail")
    setBatchDetail(data)
    getReceipts()
  }


  const getReceipts = () => batchNo && getReceiptsNos(receiptPath + `?batchNo=${batchNo}`)
    .then(async (result) => {
      // console.log(result,'result')
      for (const r of result) {
        const count = await getCardsAndCount(r.id)
        r.count = count.data[1]
      }
      setData(result)
    })
    .catch((error) => toast.error(error))
  const receiptPath = useReceiptPath()
  const listPath = useListPath()
  const searchApi = useSearchApi()
  const nextroute =
    searchApi === '/Batch/GetCardByBatchId?id'
      ? '/receipts/receipt'
      : '/receipts/provision'
  useEffect(() => {
    console.log(searchResult.batchNo, "batchNo in searchRes",batchNo, 'data in usefeect')
    setData([])
    getBatchDetail()
  }, [receiptPath, listPath, callSearch,batchNo, searchResult])

  return (
    <div className='flex flex-col md:flex-row justify-evenly  m-auto h-full relative'>
      {
        !showReceipt && !toggle && <div className='w-fit h-fit flex'>
          <input className={'w-[3rem] m-0 active:border-2 active:bg-green-200'}
            type="text"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)} />
          <button className={button}
            disabled={batchNo ? false : true}
            onClick={() => { getBatchDetail(); toggleShowReceipt(!showReceipt) }} >Select Batch View
            <Tooltip message='select the batch you want to view' />
          </button>
        </div>
      }
      <>{
        !showReceipt &&
        <>
          {!toggle ? (
            <>
              <button className={button + " h-fit"} onClick={() => setToggle(!toggle)}><AiOutlinePlus />
                Create new Receipt
                <Tooltip message='click to create a new batch receipt' />
              </button>
              <button className={button + " h-fit"} onClick={() => navigate(nextroute)}><VscDebugContinue className='text-xl' />
                <Tooltip message='click to resume the current process' />
              </button>
            </>
          ) : (
            <div className='flex-col flex flex-1 overflow-auto'>
              <p>Search receipts by batchNo,bank job no or lassraid</p>
              <div className='flex flex-col items-baseline flex-wrap   sm:flex-row min-w-fit justify-between w-full md:mb-20 '>
                <div className=' m-2 w-fit flex shadow-md bg-slate-100 rounded'> <p className='text-green-800 font-bold self-center'>BATCH No: </p> <input type='text' value={searchParams.batchNo} onChange={(e) => setSearchParams({ ...searchParams, batchNo: e.target.value })} /></div>
                <div className='m-2 w-fit flex shadow-md bg-slate-100 rounded'><p className='text-green-800 font-bold'>Job No: </p> <input type='text' value={searchParams.jobNo} onChange={(e) => setSearchParams({ ...searchParams, jobNo: e.target.value })} /></div>
                <div className=' m-2 w-fit flex shadow-md bg-slate-100 rounded'> <p className='text-green-800 font-bold '>Card No: </p> <input type='text' value={searchParams.cardNo} onChange={(e) => setSearchParams({ ...searchParams, cardNo: e.target.value })} /></div>
                <button className={button + ' m-2'} onClick={(e) => callSearch()}> Search</button>
              </div>
              <div className=' w-full'>
                {Object.keys(searchResult).length > 0 && <table className='w-full p-10 bg-white shadow-md border-2 '>
                  <thead>
                    <tr>
                      <th><p className='flex uppercase justify-between'>Batch ID<HiFilter /></p>
                      </th>
                      <th><p className='flex uppercase justify-between'>Batch NO.<HiFilter /></p></th>
                      <th><p className='flex uppercase justify-between'>Bnk JoB NO.<HiFilter /></p></th>
                      <th><p className='flex uppercase justify-between'>Total Card in Batch<HiFilter /></p></th>
                      <th><p className='flex uppercase justify-between'>Total Received<HiFilter /></p></th>
                      <th><p className='flex uppercase justify-between'>Total Not Received<HiFilter /></p></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      <BatchDetail
                        onClick={(e) => console.log(searchResult.id)}
                        field={[
                          searchResult.id,
                          searchResult.batchNo,
                          searchResult.bankJobNo,
                          searchResult.noRecords,
                          searchResult.received,
                          searchResult.notReceived,
                          <div className='flex'> <FaEye className={tableIcons} onClick={() => { setBatchNo(searchResult.batchNo); getBatchDetail(); toggleShowReceipt(!showReceipt) }} />
                            <MdOutlinePostAdd className={tableIcons} onClick={() => navigate('/receipts/receipt', { state: { batchNo } })} /></div>
                        ]}
                        receiptPath={''}
                      />
                    }
                  </tbody>
                </table>}
              </div>
            </div>
          )}</>
      }
      </>

      {/* {loading && <Spinner bg="skyblue"></Spinner>} */}
      {showReceipt && <div className='bg-white p-[20px] overflow-hidden'>
        <Reports reportData={[{ name: 'Total Cards', value: batchDetail.noRecords }, { name: 'Total received', value: batchDetail.received }, { name: 'Total Not received', value: batchDetail.notReceived }]} />
        <div className='rounded-md m-3 text-[1.2rem] grid gapc-4 grid-cols-1 md:grid-cols-3 xxl:grid-cols-4'>
          {batchDetail.batchNo && <p>Batch : {batchDetail.batchNo}</p>}
          {batchDetail.bankJobNo && <p >Bank Job No : {batchDetail.bankJobNo}</p>}
          <p >Total Cards: {batchDetail.noRecords}</p>
          <p> Total Received: {batchDetail.received}</p>
          <p> Total Not Received: {batchDetail.notReceived}</p>
          <button className={button} onClick={() => { toggleShowReceipt(false); setSearchParams({ ...searchParams, batchNo }); setToggle(true); callSearch() }}>Create new receipt</button>
        </div>
        <Table
          striped
          bordered
          hover
          variant="flat"
          size="xxl"
          className="mb-3"
        >
          <thead>
            <tr>
              <th><p className='flex uppercase justify-between'>Receipt ID<HiFilter /></p>
              </th>
              <th><p className='flex uppercase justify-between'>Batch NO.<HiFilter /></p></th>
              <th><p className='flex uppercase justify-between'>Received On<HiFilter /></p></th>
              <th><p className='flex uppercase justify-between'>Received By<HiFilter /></p></th>
              <th><p className='flex uppercase justify-between'>Card received<HiFilter /></p></th>
            </tr>
          </thead>
          <tbody>
            {data.map((receipt, idx) => (
              <BatchDetail
                key={idx}
                field={[
                  receipt?.id,
                  receipt?.batchNo,
                  receipt?.receivedAt.substring(0, 10),
                  receipt?.receivedBy,
                  receipt?.count,
                  // receipt?.receivedOn?.substring(0, 10),
                ]}
                receiptPath={receiptPath}
              />
            ))}
          </tbody>
        </Table>
      </div>}

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}
export const Tooltip: React.FC<{ message }> = ({ message }) => {
  return (<div className='hidden group-hover:inline absolute top-[30px] left-0 text-gray-400 w-fit'>{message}</div>)

}
