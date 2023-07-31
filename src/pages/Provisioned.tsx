import React, { useEffect, useState } from 'react'
import {Flip, ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
  ButtonElement,
  DetailContainer,
  DetailField,
  InputField,
  InputFieldContainer,
  ListContainer,
} from '../components'
import { useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { color } from '../artifacts/colors'
// import { IGridBox } from '../interface/interface'
// import styled from 'styled-components'
import { Axios } from '../Axios/Axios'

export function Provisioned() {
  const [search, setSearch] = useState({
    batch: 0,
    pageSize: 20,
    currentPage: 0,
  })
  const [receiptDetail, setReceiptDetail] = useState({
    date: '',
    receivedBy: '',
    deliveredBy: '',
  })
const [receipts,setReceipts] = useState([])
  const { cards, batchDetail, reports } = useSelector(
    (state) => state as IrootState,
  ).Cards
  //onclick for submit button
  const details = {
    batchId: batchDetail.batchNo,
    provisionedOn: receiptDetail.date,
    receivedOn: receiptDetail.date,
    receivedBy: receiptDetail.receivedBy,
    batchCardReceiptStatus: 0,
    deliveredBy: receiptDetail.deliveredBy,
    submissionStatus:0,
    cards: cards
      .concat(reports)
      .map((card) => ({
        cardId: card.cardId,
        status: card.status,
        comment: card.comment || '',
      })),
  }
  const save = async () => {
  //  console.log(details,'details for provissioneng')
    try {
      const response = await Axios.post(
        '/Provisioning/CreateBatchProvisioning',
        details,
      )
      console.log(details,'details from provisioning');
    toast.success('New provision receipt created successfully')

      console.log('response', response)
    } catch (e) {
      toast.error("Note: The provision receipt was not created.")
    // toast('New provision receipt created successfully')
      console.log('response error from provision receipt creation', e)
    }
  }
  async function getProvisioned () {
    try{
      const result = await Axios.get('/Provisioning/ViewAllProvisionedBatches')
      const data = result.data.map((datum:any) =>datum.batchNo)
      console.log(data)
      
    setReceipts(data)

     return await result.data
    }catch(e){
   throw new Error("Was not able to get provisioned batch")
    }
    
  }
  const handleSearch = (e: any) =>{setSearch({ ...search, batch: e.target.value })}
const submit =async()=>{
  try{
// save()
details.submissionStatus=1
await Axios.post(
  '/Provisioning/CreateBatchProvisioning',
  details,
)
toast.success('Completed the successfull')
  }catch(e){
toast.error(`Could not complete the operation. Detail${e}`)
  }
}
  useEffect(() => {
   getProvisioned()
  }, [search.currentPage])
  return (
    <div>
      {/* <PDFViewer>
      <Document>
        <Page size={'A4'} style={styles.page} >
<View style={styles.section}> */}


      {/* <Select options={receipts} path={'/receipts/provision/'} /> */}
      <h1>CARD Provision</h1>
      <DetailContainer title={'Batch Details: '}>
        <DetailField
          label="Batch No:"
          bg={color.auto}
          value={batchDetail?.batchNo}
        />
        <DetailField
          label="No of Cards:"
          bg={color.auto}
          value={batchDetail?.noRecords}
        />
        <DetailField
          label="Date created:"
          bg={color.auto}
          value={batchDetail?.dateCreated?.substring(0, 10)}
        />
      </DetailContainer>
      <InputFieldContainer title={'Card received details: '}>
        <InputField
          label="Date received:"
          value={receiptDetail.date}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, date: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="Received by:"
          value={receiptDetail.receivedBy}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, receivedBy: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="Delivered by:"
          value={receiptDetail.deliveredBy}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, deliveredBy: e.target.value })
          }
          bg={color.action}
        />
      </InputFieldContainer>
        <ListContainer title="CARDS" list={cards}/>
        {reports.length > 0 && (
          <>
            <ListContainer width={''} title="FAILED CARDS" list={reports}/>
              {/* {reports.map((report) => (
                <ListItems {...report} key={'report' + report.lasrraId} />
              ))}
            </ListContainer> */}
          </>
        )}
        {/* </View>
        </Page>
      </Document>
      </PDFViewer> */}
        <ButtonElement label="Save" onClick={save} />
        <ButtonElement label="Submit" onClick={submit}/>
      {/* </VariableGrid> */}
      {/* <Footer/> */}
      <ToastContainer position="bottom-right" newestOnTop transition={Flip}/>
    </div>
  )
}
export default Provisioned
