import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { Axios } from '../Axios/Axios'
import { getLGAName } from '../Axios/helpers/getLgaName'
const ListRelocationHeader = () => {
  const [headerList, setHeaderList] = useState<any[]>([])
  const getAllHeader = async () => {
    try {
      const result = await Axios.get('Relocation/ViewAllRetrievalHeaders')
      setHeaderList(result.data)
      console.log(result)
    } catch (e) {
      toast.error("Opps!  failed to get request")
    }
  }
  useEffect(() => {
    getAllHeader()
  }, [])
  return (
    <div>
      <h2>All Relocation Request</h2>

      <Table striped bordered hover variant="flat" size="xxl" className="mb-3">
        <thead>
          <tr>
            <th>Id </th>
            <th>Created By</th>
            <th>Date created</th>
            <th>Retrival date</th>
            <th>Pickup date</th>
            <th>Collection center</th>
            <th>Retrival status</th>
            <th>Submission status</th>
          </tr>
        </thead>
        <tbody>
          {headerList.map((card, idx) => {
            return (
              <tr key={idx}>
                <td>{card.Id}</td>
                <td>{card.CreatedBy.substring(0,10)}</td>
                <td>{card.DateCreated.substring(0,10)}</td>
                <td>{card.RetrievalDate.substring(0,10)}</td>
                <td>{card.pickupdate.substring(0,10)}</td>
                <td>{getLGAName(Number(card.collectionCenter))}</td>
                <td>{card.RetrievalStatus===0?"pending":"retrived"}</td>
                <td>{card.SubmissionStatus===0?"pending":"submited"}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}

export default ListRelocationHeader
