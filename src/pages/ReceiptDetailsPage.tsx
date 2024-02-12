import React, { useEffect, useState } from 'react'
import { getReceiptsNos } from '../Axios/helpers/getReceiptnos'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TiArrowBack } from "react-icons/ti";
import { HiFilter } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { VscDebugContinue } from "react-icons/vsc";

import { Spinner } from '../styles/styles'
// import { BatchDetail } from '../components/ListItemsComponent/BatchDetail'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MainSearch2 } from '../components/Search'
import { button } from '../styles/styles'
import BatchDetail from '../components/ListItemsComponent/BatchDetail'
export const ReceiptDetailsPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(0)
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [showReceipt, toggleShowReceipt] = useState(false)
  const reset = () => {
    toggleShowReceipt(false);
    setToggle(false);
  }
  const param = useParams()
  const id = param.receipts
  console.log(id, 'id from receiopt')
  // setToggle(false)
  const receiptPath =
    id === 'viewreceipts'
      ? '/Card/getAllCardReceipt'
      : id === 'viewprovision'
        ? '/Provisioning/ViewAllProvisionedBatches'
        : ''
  const listPath =
    id === 'viewreceipts'
      ? '/Batch/GetValidBatches'//'Card/GetAllCardReceipt'
      : id === 'viewprovision'
        ? 'Card/GetAllCardReceipt'//'/Provisioning/ViewAllProvisionedBatches'
        : ''
  const searchApi =
    id === 'viewreceipts'
      ? '/Batch/GetCardByBatchId?id'
      : '/Card/ViewCardReceiptByBatchId?BatchNo'
  const nextroute =
    searchApi === '/Batch/GetCardByBatchId?id'
      ? '/receipts/receipt'
      : '/receipts/provision'
  useEffect(() => {
    setData([])
    getReceiptsNos(receiptPath)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((error) => toast.error(error))
  }, [receiptPath, id, listPath])
  return (
    <div className='flex justify-evenly items-center m-auto h-full relative'>
      {/* <h2 className=' text-center text-bold py-[10px] '>
        {id === 'viewreceipts' ? 'Production Receipts' : 'Provision Receipt'}
      </h2> */}
      {
        !showReceipt && !toggle && <button className={button} onClick={() => toggleShowReceipt(!showReceipt)} >View Receipt
          <Tooltip message='click to view existing receipts' />
        </button>
      }
      <>{
        !showReceipt &&
        <>
          {!toggle ? (
            // <div onClick={() => setToggle(true)} className='flex w-full mb-2 relative h-[50px] justify-center'>
            <> <button className={button} onClick={() => setToggle(true)}><AiOutlinePlus />
              Create new Receipt
              <Tooltip message='click to create a new batch receipt' />

            </button>
              <button className={button} onClick={() => navigate(nextroute)}><VscDebugContinue />
                <Tooltip message='click to resume the current process' />
              </button>
            </>
            // </div>
          ) : (
            <>
              <div className='flex flex-col items-baseline w-[80%] md:w-[70%] lg:w-[50%] sm:flex-row max-w-[800px] justify-between'>
                <p className='text-green-800 '>SELECT BATCH: </p>
                <div className='flex-1'>
                  <MainSearch2 api={searchApi} to={nextroute} listPath={listPath} />

                </div>
                <button onClick={reset} className={button + ' ml-4'}><TiArrowBack className='mr-2' />
                  Back</button>
              </div>

            </>

          )}</>
      }
      </>

      {/* {loading && <Spinner bg="skyblue"></Spinner>} */}
      {showReceipt && <div className='bg-white p-[20px] overflow-hidden'>
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
              <th><p className='flex uppercase justify-between'>Batch No<HiFilter /></p>
              </th>
              <th><p className='flex uppercase justify-between'>Record Count<HiFilter /></p></th>
              <th><p className='flex uppercase justify-between'>Received By<HiFilter /></p></th>
              <th><p className='flex uppercase justify-between'>Date created<HiFilter /></p></th>
              <th><p className='flex uppercase justify-between'>Date received<HiFilter /></p></th>
            </tr>
          </thead>
          <tbody>
            {data.map((batch, idx) => (
              <BatchDetail
                key={batch.batchNo + '' + batch.record_count}
                field={[
                  batch?.batchNo,
                  batch?.record_count,
                  batch?.receivedBy,
                  batch?.dateCreated.substring(0, 10),
                  batch?.receivedOn?.substring(0, 10),
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
