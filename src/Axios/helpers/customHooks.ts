import { useParams } from "react-router-dom";

export const useReceiptPath= ()=>{
const {receipts} = useParams()

    return receipts === 'viewreceipts'
    ? '/receipt'
    : receipts === 'viewprovision'
      ? '/Provisioning/ViewAllProvisionedBatches'
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