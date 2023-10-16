import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Axios } from '../Axios/Axios'
import { useCallback } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { getLGAName } from '../Axios/helpers/getLgaName'
import { ToastContainer, toast } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

interface IRODetail {
  id: number
  createdBy: string
  retrievalStatus: number
  retrievaldate: string
  pickupdate: string
  collectionCenter: number
  submissionStatus: number
}
const ViewRequestByLGACode = () => {
  const { lgacode } = useParams()
  const [cards, setCard] = useState<any[]>([])
  console.log([
        ...cards.map((card, idx) => idx)
  ],"initial value of seleceted")

  const [selected, setSelected] = useState<number[]>([
  ])

  const [retrivalOrderDetail, setRetrivalOrderDetail] = useState<IRODetail>({
    id: 0,
    createdBy: '',
    retrievalStatus: 0,
    retrievaldate: 'string',
    pickupdate: 'string',
    collectionCenter: Number(lgacode),
    submissionStatus: 0,
  })
  console.log(cards)
  const getRequestByLgaCode = useCallback(async () => {
    try {
      const result = await Axios.get(
        `/Relocation/ViewRelocationRequestByLGACode?FromLGACode=${lgacode}`,
      )
      const modifiedData = result.data.map((item: any) => ({
        relocateRequestId: Number(item.RelocateRequestId),
        fromLocationCode: Number(item.FromLocationCode),
        fromLGACode: Number(item.FromLGACode),
        destinationLocationCode: Number(item.DestinationLocationCode),
        destinationLGACode: Number(item.DestinationLGACode),
        cardId: Number(item.cardId),
        isArrivedAtHeadOffice: false,
        retrivalOrderheaderId: null,
        lasrraId: item.LasrraId,
        createdAt: item.CreatedAt,
      }))
      const uniquecard = new Set(modifiedData.map((card: any) => card.lasrraId))
      const newData = Array.from(uniquecard).map((card) =>
        modifiedData.find((req: any) => req.lasrraId === card),
      )
      setCard(newData)
    } catch (err) {
      alert(err + ' could not fetch cards')
    }
  }, [lgacode])
  //This handlescreation of retrival order
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if(selected.length<=0)return
    const selectedCards = cards.filter((card,idx)=>selected.indexOf(idx)!==-1)
    console.log(selectedCards,"selectedCards")
    const payload = {
      reLocationOrderHeader: retrivalOrderDetail,
      createRelocationOrder: selectedCards,
    }
    try {
      const { data, status } = await Axios.post(
        'Relocation/CreateRetrievalOrder',
        payload,
      )
      toast.success(status + ' Successfully created')
      console.log(data, 'retiveorder created')
      setRetrivalOrderDetail({
        ...retrivalOrderDetail,
        id: data.reLocationOrderHeader.id,
      })
      return
    } catch (e) {
      console.log(e)
      toast.error('Oops! Something went wrong')
    }
  }
  const handleSelect = (idx: number) => {
    if (selected.indexOf(idx) !== -1) {
      const updated = selected.filter((card) => card !== idx)
      setSelected(updated)
    } else {
      setSelected([...selected, idx])
    }
  }
  // console.log(getLGAName(Number(lgacode)))
  useEffect(() => {
    getRequestByLgaCode()
    setSelected([
    ...cards.map((card, idx) => idx),

    ])
  }, [lgacode])
  return (
    <Container className="container">
      <h2> Retrival Order Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          {retrivalOrderDetail.id > 0 && (
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formGridid"
              style={{ fontWeight: 900 }}
            >
              <Form.Label>OrderId:</Form.Label>
              <Form.Control
                type="text"
                value={retrivalOrderDetail.id}
                readOnly
              />
            </Form.Group>
          )}
          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formGridcollectionCenter"
            style={{ fontWeight: 900 }}
          >
            <Form.Label>Collection Center:</Form.Label>
            <Form.Control
              type="text"
              value={getLGAName(Number(lgacode))}
              readOnly
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formGridCreatedBy"
            className="mb-3"
            style={{ fontWeight: 900 }}
          >
            <Form.Label>Created By:</Form.Label>
            <Form.Control
              type="text"
              value={retrivalOrderDetail.createdBy}
              onChange={(e) =>
                setRetrivalOrderDetail({
                  ...retrivalOrderDetail,
                  createdBy: e.target.value,
                })
              }
              placeholder="enter the creater"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            controlId="formGridpickupdate"
            className="mb-3"
            style={{ fontWeight: 900 }}
          >
            <Form.Label>Pickup date:</Form.Label>
            <Form.Control
              type="date"
              value={retrivalOrderDetail.pickupdate}
              onChange={(e) =>
                setRetrivalOrderDetail({
                  ...retrivalOrderDetail,
                  pickupdate: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group
            as={Col}
            className="mb-3"
            controlId="formGridRetrival"
            style={{ fontWeight: 900 }}
          >
            <Form.Label>Retrival Date</Form.Label>
            <Form.Control
              type="date"
              value={retrivalOrderDetail.retrievaldate}
              onChange={(e) =>
                setRetrivalOrderDetail({
                  ...retrivalOrderDetail,
                  retrievaldate: e.target.value,
                })
              }
            />
          </Form.Group>
        </Row>
        <h2>Card Summary</h2>

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
              <th>Id</th>
              <th>CardId</th>
              <th>LASRRA ID</th>
              <th>DESTINATION</th>
              <th>RELOCATION REQUEST ID</th>
              <th>CreatedAt</th>
              <th>Selection</th>
              {/* <th>Total card</th> */}
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 &&
              cards.map((card, idx) => {
                // const lgaCode = Number(card.FromLGACode)
                return (
                  <tr key={idx}>
                    <td>{card.id}</td>
                    <td>{card.cardId}</td>
                    <td>{card.lasrraId}</td>
                    <td>{getLGAName(Number(card.destinationLGACode))}</td>
                    <td>{card.relocateRequestId}</td>
                    <td>{card.createdAt.substring(0, 10)}</td>
                    <td>
                      <Form.Check
                        type={'checkbox'}
                        checked={selected.indexOf(idx) !== -1}
                        onChange={() => handleSelect(idx)}
                      />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        <Button type="submit" className="btn-success">
          {' '}
          Create{' '}
        </Button>
      </Form>
      <ToastContainer position="bottom-right" newestOnTop />
    </Container>
  )
}

export default ViewRequestByLGACode
