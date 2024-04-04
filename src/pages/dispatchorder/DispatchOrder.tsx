import React, { useCallback, useEffect, useState } from 'react'
import {
  Outlet, useLocation,
} from 'react-router-dom'
import { InputField, InputFieldContainer } from '../../components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { button, input } from '../../styles/styles'
import { getCardsForDispatch, createDispatchOrder } from '../../services';
import { OrderBatchSummary } from '../../components/ListItemsComponent/OrderBatchSummary'


export const DispatchOrder = () => {
  const location = useLocation()
  // console.log(location,"location")
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (location.pathname === "/receipts/order") {
      setActive(1)
    } else if (location.pathname === "/receipts/order/all")
      setActive(2)

  }, [])
  return (
    <div>
      <div className="flex m-0 border-0">
        {<>
          <NavLink title={'View Dispatch orders'} to={''} index={1} active={active} setActive={setActive} />
          <NavLink title={'Create new orders'} to={'all'} index={2} active={active} setActive={setActive} />
        </>
        }
      </div>
      <div className='flex'>

      </div>
      <Outlet
      // context={{ filter, setState, orderObjs, setFilter, receiptDetail, setReceiptDetail, createDispatch } satisfies OutletContextType}
      />
      <ToastContainer position='top-right' newestOnTop />
    </div>
  )
}
// type OutletContextType = { filter: any, setState: any, orderObjs: any, setFilter: any, receiptDetail: any, setReceiptDetail: any, createDispatch: any }


export const OrdersMAngager = () => {
  const [card, setCard] = useState<any>([])
  // console.log(card)
  const [filter, setFilter] = useState<any>({
    batchNo: 0,
    lassraId: '',
    collectionCenter: '',
  })
  const [dispatchDetail, setDispatchDetail] = useState<any>({
    destination: card.length > 0 ? card[0].destination : '',
    dispatchStatus: 0, //0 is initial,1 is out for dispatch,2 is dispatched
    createdBy: '',
    createdAt: new Date(),
    count: card.length,
    pickUpDate: '',
    dispatchedAt: new Date(),
    acknowledgedAt: new Date(),
    acknowledgedBy: '',
    dispatcher: '',
    cardDispatch: [...card],
  })
  const createDispatch = async () => {
    //     console.log(dispatchDetail,card)
    // return
    const data = { ...dispatchDetail, cardDispatch: card }
    // console.log(data)

    try {
      await createDispatchOrder(data)
      toast.success("Order created Successfull")
    } catch (e) {
      // console.log(e)
      toast.error('failed to create Dispatch order')
    }


  }

  const getCards = useCallback(async () => {
    try {
      const result = await getCardsForDispatch(filter.batchNo, filter.collectionCenter, filter.lassraId)
      // console.log(result, "from getCards")
      if (result.length) {
        // const newCard = [...new Set([...card,...result.data])]
        const compareObjects = ((obj1: any, obj2: any) => obj1.lassraId === obj2.lassraId)

        const newCard = [
          ...card,
          ...result.filter((newObj: any) => !card.some((oldObj: any) => compareObjects(oldObj, newObj)))
        ];
        setCard(newCard)
        setFilter({ batchNo: 0, lassraId: '', collectionCenter: '' })
      } else return
    } catch (e) {
      toast.error(e as string)
    }

  }, [card, filter.batchNo, filter.collectionCenter, filter.lassraId])

  const removeCards = useCallback(() => {
    if (filter.lassraId.length) {

      const newList = [...card].filter(item => item.lassraId !== filter.lassraId);
      setCard(newList);
    }
    setFilter({ batchNo: 0, lassraId: '', collectionCenter: '' })
  }, [card, filter.lassraId])

  useEffect(() => {

  }, [getCards, removeCards, card, dispatchDetail])
  return <div className='bg-white rounded-md shadow-md px-5'>
    {
      <InputFieldContainer title={'Order Details: '}>
        <InputField
          label="CollectionCenter:"
          value={dispatchDetail.destination.trim()}
          onChange={(e) => setDispatchDetail({ ...dispatchDetail, destination: e.target.value })}
          bg={'green'}
        />
        <InputField
          label="Dispatcher's Name:"
          type='text'
          value={dispatchDetail.dispatcher}
          onChange={(e) =>
            setDispatchDetail({ ...dispatchDetail, dispatcher: e.target.value })
          }
          bg={'green'}
        />
        <InputField
          label=" Name of creator:"
          type='text'
          value={dispatchDetail.createdBy}
          onChange={(e) =>
            setDispatchDetail({ ...dispatchDetail, createdBy: e.target.value })
          }
          bg={'green'}
        />
        <InputField
          label="Pickup Date:"
          type='date'
          value={dispatchDetail.pickUpDate}
          onChange={(e) =>
            setDispatchDetail({ ...dispatchDetail, pickUpDate: e.target.value })
          }
          bg={'green'}
        />
        <InputField
          label="No of Cards:"
          value={dispatchDetail.count}
          // readOnly
          onChange={(e) =>
            setDispatchDetail({ ...dispatchDetail, count: card.length })
          }
          bg={'green'}
        />
      </InputFieldContainer>}
    {
      <>
        <div className='flex-col md:flex-row flex  w-full m-4 justify-center gap-2 items-end '>
          {/* <button className={button} onClick={getCards}>Add</button> */}
          <label htmlFor='CollectionCenter'> Collection Center
            <input className={input} type='text' name="CollectionCenter" value={filter.collectionCenter.trim()} onChange={(e) => setFilter({ ...filter, collectionCenter: e.target.value })} />
          </label>
          <label htmlFor='batchNo'>Batch No:
            <input className={input} type='number' name="batchNo" value={filter.batchNo} onChange={(e) => setFilter({ ...filter, batchNo: e.target.value })} />
          </label>
          <label htmlFor='LassraId'>LassraId:
            <input className={input} type='text' name="LassraId" value={filter.lassraId.trim()} onChange={(e) => setFilter({ ...filter, lassraId: e.target.value })} />
          </label>
          {/* <button className={button} onClick={removeCards}>Remove</button> */}
        </div>
        <div className='flex-col md:flex-row flex  w-full m-4 justify-center gap-2 items-end '>
          <button className={button} onClick={getCards} disabled={!filter.collectionCenter&& !filter.lassraId}>Add</button>
          <button className={button} onClick={removeCards} disabled={!card.length||!filter.lassraId}>Remove</button>
        </div>
        <div className='flex flex-col flex-1 p-[0.5rem] m-[0.5rem] overfow-x-hidden'>
          <h3 className='font-bold bg-whitemx-2'>Cards summary</h3>
          {card.length > 0 &&
            <OrderBatchSummary
              cards={card}
            />
          }
        </div>
        <button onClick={createDispatch} className={button} >Create Dispatch</button>

      </>
    }
  </div>
}
const NavLink: React.FC<{ title: string, index: number, to: string, active: number, setActive: (state: any) => void }> = ({ title, index, to, active, setActive }) => {
  const navigate = useNavigate()
  const handler = () => {
    setActive(index);
    navigate(to)
  }
  useEffect(() => { }, [active])
  return (
    <div
      onClick={handler}
      className={` ${active === index ? "bg-white text-black  border-b-[0px]  " : "bg-green-200 text-gray-600 border-b-2 "}w-fit h-10  border-t-2 border-l-2 border-r-2 px-3 py-2 flex-grow rounded-tr-[8px] rounded-tl-[8px]`}
    >
      <p className='text-center font-bold'>{title}</p>
    </div>
  )
}