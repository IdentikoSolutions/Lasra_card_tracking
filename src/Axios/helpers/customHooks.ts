import { useNavigate, useParams } from "react-router-dom";

export const useReceiptPath= ()=>{
const {receipts} = useParams()

    return receipts === 'viewreceipts'
    ? '/receipt'
    : receipts === 'viewprovision'
      ? '/provision'
      : ''
}
export const useListPath =()=>{
  const {receipts} = useParams()
return receipts === 'viewreceipts'
? '/Batch/GetValidBatches'//'Card/GetAllCardReceipt'
: receipts === 'viewprovision'
  ? 'Card/GetAllCardReceipt'//'/Provisioning/ViewAllProvisionedBatches'
  : ''
}
export const useSearchApi =()=>{
  const {receipts} = useParams()
  return receipts === 'viewreceipts'
  ? '/Batch/GetCardByBatchId?id'
  : '/Card/ViewCardReceiptByBatchId?BatchNo'

}