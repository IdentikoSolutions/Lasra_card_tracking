import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Axios } from '../Axios/Axios';
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { getLGAName } from '../Axios/helpers/getLgaName';
// import ListRelocationHeader from './listRelocationHeader';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Table } from 'react-bootstrap';
// import { warn } from 'console';
import { getOneDeliveryOrder } from '../services/index';

export const ViewSingleRetrivalOrder = () => {
  const { id } = useParams()
  const [data, setData] = useState<any>({ createRelocationOrder: [], reLocationOrderHeader: {} })

  const getOneRetrivalOrder = async () => {
    try {
      const  data  = getOneDeliveryOrder(id)   
         setData(data)
    } catch (e:any) {
      throw new Error(e)
      // console.log(e, "api call not succesfful")
    }

  }
  const ack_retrieval = async () => {
    try {
      await Axios.put(``)
    } catch (e) {
      alert(e)
    }
  }
  const { createRelocationOrder, reLocationOrderHeader } = data
  useEffect(() => {
    getOneRetrivalOrder()
  }, [])
  return (
    <>
      <Button className='btn-success' onClick={ack_retrieval}>Acknowledge this Order</Button>
      {
        console.log(reLocationOrderHeader.hasOwnProperty("id"), "has own property")}
      {
        //  &&
        <Form>
          <h2>Single retrival Order</h2>
          <Row>
            {Object.keys(data).length > 0 && (
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formGridid"
                style={{ fontWeight: 900 }}
              >
                <Form.Label>OrderId:</Form.Label>
                <Form.Control
                  type="text"
                  value={reLocationOrderHeader.id}
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
                value={getLGAName(reLocationOrderHeader.collectionCenter)}
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
                value={reLocationOrderHeader.createdBy}
                readOnly
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
                type="text"
                value={reLocationOrderHeader.pickupdate
                  // .substring(0,10)
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
                type="text"
                value={reLocationOrderHeader.retrievaldate
                  // .substring(0,10)
                }
              />
            </Form.Group>
          </Row>

        </Form>}
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
            {/* <th>LASRRA ID</th> */}
            <th>DESTINATION</th>
            {/* <th>RELOCATION REQUEST ID</th> */}
            <th>Current Location</th>
            <th>deliverd</th>
          </tr>
        </thead>
        <tbody>
          {createRelocationOrder.length > 0 &&
            createRelocationOrder.map((card: any, idx: any) => {
              return (
                <tr key={idx}>
                  <td>{card.id}</td>
                  <td>{card.cardId}</td>
                  <td>{getLGAName(Number(card.destinationLocationCode))}</td>
                  <td>{getLGAName(Number(card.fromLGACode))}</td>
                  <td>{card.isArrivedAtHeadOffice ? "true" : "false"}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>

    </>

  );
};

// export default ViewSingleRetrivalOrder;