import React, { useEffect, useCallback, useState } from 'react'
import { Axios } from '../../Axios/Axios'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { getLGAName } from '../../Axios/helpers/getLgaName'
import { createPortal } from 'react-dom'
// import Modal from 'react-modal'
import { DeliveryOrder } from '../../components/Modals/deliveryOrder'
import { ModalWrap } from '../../components/Modals/Porter'
// import ReactModal from 'react-modal'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useDelivery } from '../../context/DeliveryContext'
import { DeliveryOrderMultiple } from '../../components/Modals/deliveryOrdermultiple'
import { useApp } from '../../context/AppContext'
// import { Porter } from '../../components/Modals/Porter'
// import useCallback from 'react';
export interface IRequest {
  cardId: number
  fromLocationCode: string
  id: number
  lasrraId: string
  updatedAt: string
  mode: boolean
  setMode: (item: boolean) => void
  current: number
  setCurrent: (item: number) => void
  orderlist: any[]
  updateOrderlist: (item: any[]) => void
}
function AllDeliveryRequest() {
  const {
    mode,
    setMode,
    current,
    setCurrent,
    request,
    setRequest,
    orderlist,
  } = useDelivery() as any
  const { setPageName } = useApp() as any
  setPageName("Home Delivery")
  const [nextstep, updateNextstep] = useState(false)
  console.log(orderlist, 'orderlist')
  const getRequest = useCallback(async () => {
    try {
      const { data } = await Axios.get('/Delivery/GetNewDeliveryRequest')
      // console.log(data)
      setRequest(data)
    } catch (e) {
      console.log(e)
    }
  }, [])
  useEffect(() => {
    getRequest()
    // console.log(mode,current,'from all delivery')
  }, [mode, getRequest])
  return (
    <div>
      {/* {mode && <ModalWrap> */}
      {/* <div id='portal'> Portal content</div> */}
      {/* <DeliveryOrder {...item}/> */}
      {/* </ModalWrap>} */}
      <h2 className="text-bold pb-3">Delivery request</h2>
      <Form className="flex justify-between">
        {false && <Form.Check // prettier-ignore
          className="justify-end mr-0"
          type="switch"
          id="custom-switch"
          label="Switch mode"
          value={mode ? 'selected' : 'not selected'}
          onChange={() => setMode(!mode)}
        />}
        {orderlist.length > 0 && (
          <div className="flex flex-col align-end w-[150px]">
            <label className="flex-col  absolute top-[150px] text-sm italic">
              Click "proceed" to create order for selected request
            </label>
            <div
              className="bg-green-500 w-fit text-white flex justify-around rounded-md font-extrabold mb-3 items-end p-2"
              onClick={() => updateNextstep(true)}
            >
              Proceed<BiRightArrowAlt className="inline" />
            </div>
          </div>
        )}
      </Form>
      {orderlist.length > 0 ? <Table striped bordered hover variant="flat" size="xxl" className="mb-3">
        <thead>
          <tr>
            <th>Card Id</th>
            <th>Lasrra Id</th>
            <th>Id</th>
            <th>Current location</th>
            <th>Date received</th>
          </tr>
        </thead>
        <tbody>
          {!mode === false &&
            nextstep &&
            createPortal(
              <ModalWrap>
                <DeliveryOrderMultiple />
              </ModalWrap>,
              document.getElementById('portal') as Element,
            )}
          {request.map((item: IRequest, idx: number) => (
            <RequestItem
              cardId={item.cardId}
              fromLocationCode={item.fromLocationCode}
              id={item.id}
              lasrraId={item.lasrraId}
              updatedAt={item.updatedAt.substr(1, 10)}
              mode={mode}
              setMode={setMode}
              current={current}
              setCurrent={setCurrent}
              orderlist={[]}
              updateOrderlist={function (item: any[]): void {
                throw new Error('Function not implemented.')
              }}
            />
          ))}
        </tbody>
      </Table> : <p>Currently no pending request</p>}
    </div>
  )
}

export default AllDeliveryRequest
const RequestItem: React.FC<IRequest> = (item) => {
  const { orderlist, updateOrderlist, mode } = useDelivery() as any

  const handleclick = () => {
    if (!item.mode) {
      item.setCurrent(item.id)
      return
    }
  }
  const handleselect = (item: IRequest) => {
    console.log(orderlist, mode, 'from list')
    console.log(
      orderlist.find((option: any) => option.id !== item.id),
      'result',
    )
    if (orderlist.find((option: any) => option.id === item.id) === undefined) {
      updateOrderlist((orderlist: IRequest[]) => [...orderlist, item])
    } else {
      const newList = orderlist.filter((option: any) => option.id !== item.id)
      updateOrderlist(newList)
    }
  }
  // console.log(item.current,'=current',item.id,'= id all delivery request condition')
  useEffect(() => {
    // console.log(item.current)
  }, [item.current])
  return (
    <tr onClick={handleclick}>
      {/* {item.mode && <ModalWrap><DeliveryOrder {...item} /></ModalWrap>} */}
      {item.mode === false &&
        item.current === item.id &&
        createPortal(
          <ModalWrap>
            <DeliveryOrder {...item} />
          </ModalWrap>,
          document.getElementById('portal') as Element,
        )}

      <td>{item.cardId}</td>
      <td>{item.lasrraId}</td>
      <td>{item.id}</td>
      <td>{getLGAName(Number(item.fromLocationCode))}</td>
      <td>{item.updatedAt}</td>
      {item.mode && (
        <td>
          <input
            type="checkbox"
            value="checked"
            onChange={() => handleselect(item)}
          />
        </td>
      )}
    </tr>
  )
}
