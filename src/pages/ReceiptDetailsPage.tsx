import React, { useEffect, useState } from 'react'
import { getReceiptsNos } from '../Axios/helpers/getReceiptnos'
import { BatchDetail } from '../components/ListItemsComponent/BatchDetail'
import {
  //  Navigate, useNavigate,
    useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ReceiptDetailsPage = () => {
  const [data, setData] = useState<any[]>([])
  const param = useParams()
  const id = param.receipts
  const receiptPath =
    id === 'viewreceipts'
      ? '/Card/getAllCardReceipt'
      : id === 'viewprovision'
      ? '/Provisioning/ViewAllProvisionedBatches'
      : ''
 
  useEffect(() => {
    getReceiptsNos(receiptPath)
      .then((result) => {
        setData(result)})
      .catch((error) => toast.error(error))
  }, [receiptPath])
  return (
    <div>
      <h2>
        {id === 'viewreceipts' ? 'Production Receipts' : 'Provision Receipt'}
      </h2>

      {data.map((data, idx) => (
        <BatchDetail
          key={data.batchNo}
          field={[
            data?.batchNo,
            data?.record_count,
            data?.receivedBy,
            data?.dateCreated,
            data?.receivedOn,
          ]}
          receiptPath={receiptPath}
        />
      ))}
      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}
// // "batchNo": 32,
// "receivedBy": "Dami",
// "dateCreated": "2023-06-22T16:43:40.147",
// "receivedOn": "2026-08-23T00:00:00"
