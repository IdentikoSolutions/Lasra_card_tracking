import React, { useEffect, useState } from 'react'
import { getReceiptsNos } from '../Axios/helpers/getReceiptnos'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MainSearch } from '../components'
import { Paper, Spinner } from '../styles/styles'
import { BatchDetail } from '../components/ListItemsComponent'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const ReceiptDetailsPage = () => {
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
  }, [receiptPath])
  return (
    <div>
      <h2 className=' text-center font-weight-bold'>
        {id === 'viewreceipts' ? 'Production Receipts' : 'Provision Receipt'}
      </h2>
      {!toggle ? (
        <div onClick={() => setToggle(true)}>
          <Button className="btn-success">Create new Receipt </Button>
        </div>
      ) : (
        <MainSearch
          field={'Batch No'}
          listPath={'Card/GetAllCardReceipt'}
          to={nextroute}
          api={`${searchApi}=${search}`}
          search={search}
          onChange={(e) => setSearch(e.target.value)}
          setToggle={setToggle}
          // onBlur={()=>setToggle(false)}
        />
      )}
      {loading && <Spinner></Spinner>}
      <Paper>
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
      </Paper>

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}
