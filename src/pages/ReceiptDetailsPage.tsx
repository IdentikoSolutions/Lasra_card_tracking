import React, { useEffect, useState } from 'react'
import { getReceiptsNos } from '../Axios/helpers/getReceiptnos'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MainSearch } from '../components'
import { Spinner } from '../styles/styles'
import { BatchDetail } from '../components/ListItemsComponent'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MainSearch2 } from '../components/Search'

export const ReceiptDetailsPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState(0)
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState<any[]>([])
  const param = useParams()
  const id = param.receipts
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
  }, [receiptPath,id,listPath])
  return (
    <div>
      <h2 className=' text-center text-bold '>
        {id === 'viewreceipts' ? 'Production Receipts' : 'Provision Receipt'}
      </h2>
      {!toggle ? (
        <div onClick={() => setToggle(true)} className='mb-2'>
          <Button className="btn-success">Create new Receipt </Button>
          <button className='bg-green-600 px-3 py-2 rounded-md text-white m-3' onClick={()=>navigate(nextroute)}>Resume current</button>
        </div>
      ) : (
        <>
        <div className='flex items-baseline'>
          <p className='text-green-800 '>SELECT BATCH: </p>
          <div className='flex-1'>
          <MainSearch2  api={searchApi} to={nextroute} listPath={listPath}/>

          </div>
        </div>
        
        </>

      )}
      {loading && <Spinner></Spinner>}
      <div className='bg-white p-[20px] overflow-hidden'>
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
              <th>Batch No</th>
              <th>Record Count</th>
              <th>Received By</th>
              <th>Date created</th>
              <th>Date received</th>
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
                  batch?.dateCreated.substring(0,10),
                  batch?.receivedOn?.substring(0,10),
                ]}
                receiptPath={receiptPath}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}
