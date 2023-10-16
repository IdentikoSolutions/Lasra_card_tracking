import React, { useCallback, useEffect, useState } from 'react'
import { Axios } from '../Axios/Axios'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getLGAName } from '../Axios/helpers/getLgaName'
import { useNavigate } from 'react-router-dom'
// const list =[
//   {
//     "FromLGACode": 24,
//     "item_count": 34,
//     "LGAName": "IKEJA LG"
//   },
//     {
//       "FromLGACode": 27,
//       "item_count": 1,
//       "LGAName": "IKEJA LG"
//     },
//     {
//         "FromLGACode": 20,
//         "item_count": 15,
//         "LGAName": "IKEJA LG"
//       },
//         {
//           "FromLGACode": 17,
//           "item_count": 21,
//           "LGAName": "IKEJA LG"
//         },
// {
//     "FromLGACode": "1",
//     "Name": "AGEGE LG",
//     "record_count": 3
//   },
//   {
//     "FromLGACode": "8",
//     "Name": "EREDO LCDA",
//     "record_count": 8
//   },
//   {
//     "FromLGACode": "10",
//     "Name": "IBA LCDA",
//     "record_count": 3
//   },
//   {
//     "FromLGACode": "17",
//     "Name": "IKEJA LG",
//     "record_count": 2
//   },
//
//   ]
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
    <div>
      {' '}
      <h2>Retrival order page</h2>
      <Container className="mb-5">
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
              <th>{''}</th>
              <th>Collection center</th>
              <th>Total card</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.map((card, idx) => {
                const lgaCode = Number(card.FromLGACode)
                return (
                  <tr key={idx}>
                    <td>
                      <Form.Check
                        type={'checkbox'}
                        checked={idx === selected}
                        onChange={() => handleCheck(idx)}
                      />
                    </td>
                    <td>{getLGAName(Number(lgaCode))}</td>
                    <td>{card.record_count}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        {selected >= 0 && (
          <Button className="btn-success" onClick={createRetrival}>
            Create Retrival Order for {list[selected]['Name']}
          </Button>
        )}
      </Container>
    </div>
  )
}

export default RequestSummary
