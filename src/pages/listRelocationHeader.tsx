import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { Axios } from '../Axios/Axios'
import { getLGAName } from '../Axios/helpers/getLgaName'
import { button } from '../styles/styles'
export const ListRelocationHeader = () => {
  const [mode, toggleMode] = useState(false)
  const [headerList, setHeaderList] = useState<any[]>([])
  const getAllHeader = async () => {
    try {
      // const result = await Axios.get('Relocation/ViewAllRetrievalHeaders')
      // setHeaderList(result.data)
      // console.log(result)
    } catch (e) {
      toast.error("Opps!  failed to get request")
    }
  }
  useEffect(() => {
    getAllHeader()
  }, [])
  return (
    <div className='w-full'>
      <div className='flex flex-1 gap-10'>

        <button className={button} onClick={() => toggleMode(true)}>Create From Requests</button>
        <button className={button} onClick={() => toggleMode(false)}>Enter  manually</button>
      </div>

      {mode ? <>
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
                  <td>{card.CreatedBy.substring(0, 10)}</td>
                  <td>{card.DateCreated.substring(0, 10)}</td>
                  <td>{card.RetrievalDate.substring(0, 10)}</td>
                  <td>{card.pickupdate.substring(0, 10)}</td>
                  <td>{getLGAName(Number(card.collectionCenter))}</td>
                  <td>{card.RetrievalStatus === 0 ? "pending" : "retrived"}</td>
                  <td>{card.SubmissionStatus === 0 ? "pending" : "submited"}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </> :
        <ManualRetrival />
      }

      <ToastContainer position="bottom-right" newestOnTop />
    </div>
  )
}

const ManualRetrival = () => {
  const [value,setValue] =useState('')
  return( <div>
    <div className="flex gap-10 py-2">
    <button className={button +" w-[200px]"} onClick={() => console.log("add")}>Add</button>
  <input className='bg-red border-2 flex-1 ' type='text' value={value} onChange={(e)=>setValue(e.target.value)}/>
  </div>
<div className='w-full h-[200px]'>list here</div>
  </div>)
}