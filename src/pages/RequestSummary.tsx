import React, { useCallback, useEffect, useState } from 'react'
import { Axios } from '../Axios/Axios'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getLGAName } from '../Axios/helpers/getLgaName'
import { useNavigate } from 'react-router-dom'

const RequestSummary = () => {
  const [list, setList] = useState<any[]>([])
const navigate = useNavigate()
  const [selected, setSelected] = useState(-1)
  // const [checked,toggle] = useState(-1)
  const getRequests = useCallback(async () => {
    try {
      const result = await Axios.get('/Relocation/RelocationRequestSummary')
      setList(result.data)
      console.log(result.data)
    } catch (e) {
      window.alert(e)
    }
  }, [selected])
  const handleCheck = (idx: number) => {
    if (selected === idx) {
      setSelected(-1)
      return
    }
    setSelected(idx)
  }
  const createRetrival =()=>{
  // console.log(list[selected]["FromLGACode"],"Lgacode")
navigate(`/receipts/retrival/${list[selected]["FromLGACode"]}`)
  }
  useEffect(() => {
    getRequests()
  },[selected])
  return (
    <div className='mx-auto'>
      <div className='w-[60vw] m-auto'>

      <h2 className='mt-7 mb-5'>Summary of pending request</h2>
      <p>To create a new retrival order click on the row for the collection center you want to retrieve from the table below.  when selected a red dot appears on the row indication the selected row and a button appears. click the button to continue creating the order.</p>
      {/* <Container className="mb-5"> */}
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
              {/* <th>{''}</th> */}
              <th>Collection center</th>
              <th>Total card</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.map((card, idx) => {
                const lgaCode = Number(card.FromLGACode)
                return (
                  <tr key={idx} onClick={()=>handleCheck(idx)} className={`${selected===idx? '!bg-red-900 text-red-500':''}`}>
                    {/* <td>
                      <Form.Check
                        type={'checkbox'}
                        checked={idx === selected}
                        onChange={() => handleCheck(idx)}
                      />
                    </td> */}
                    <td>{getLGAName(Number(lgaCode))}</td>
                    <td className='flex justify-between'>{card.record_count} {selected===idx && <div className='bg-red-500 w-4 h-4 rounded-full'></div>}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>

        {selected >= 0 && (
          <Button className="btn-success" onClick={createRetrival}>
            Create Retrival Order for {list[selected]['Name']}
          </Button>
        )}
      {/* </Container> */}
    </div>
  )
}

export default RequestSummary
