import React, { ReactNode, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from 'react-bootstrap/Pagination'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Icard, IcardReceipt } from '../interface/interface'
import { HiFilter } from "react-icons/hi";
import { ListItems } from './ListItemsComponent/ListItems'
import { EditCard } from './Modals/editCard'
interface IlistContainer {
  title?: string
  width?: string
  children?: ReactNode
  list?: Icard[] | IcardReceipt[]
  batchStatus?: number
  add?: ()=>void
  remove?: ()=>void
}
export const ListContainer: React.FC<IlistContainer> = ({
  title,
  children,
  list,
  width,
  batchStatus,
  add,
  remove,
  ...props
}) => {
  // console.log(list,'list from list container')
  const [pageSize, setPageSize] = useState(20)
  const [pageNumber, setPageNumber] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [active, setActive] = useState(-1)
  const [currentCard, setCurrentCard] = useState<any>({})
  const reset = (num?: number) => {
    if (num) return setActive(num)
    setActive(-1)
  }
  function setNewActive(card: Icard) {
    if (active !== -1 && active === card.cardId) return reset(-1)
    // reset()
    if (active !== -1) return
    setActive(card.cardId)
    setCurrentCard(card)
    // console.log(currentCard, 'from setNewActive')
  }
  let totalPages = (list && Math.ceil(list.length / pageSize)) || 1
  //function to go to previous page
  const getPrev = () => {
    currentPage > 1 && setCurrentPage((currentPage) => (currentPage -= 1))
  }
  //function to go to next page
  const getNext = () => {
    currentPage < totalPages &&
      setCurrentPage((currentPage) => (currentPage += 1))
  }
  //goto selected page
  const getPageNumber = () => {
    setCurrentPage((currentPage) => pageNumber)
  }
  let start = currentPage * pageSize,
    end = start + pageSize
  //pagination buttons
  const pageButtons =
    totalPages > 1 &&
    new Array(totalPages).fill(0, 0).map((item, idx) => {
      return (
        idx == currentPage && (
          <Pagination.Item
            className={`${idx === currentPage ? 'bg-green-500 border-green-700 border-2 text-white' : ""}`}
            // onClick={() => currentPage < totalPages && setCurrentPage(idx)}
            key={idx}
          >
            {idx + 1}
          </Pagination.Item>
        )
      )

    })
  useEffect(() => {
    console.log(currentPage)
  }, [list, currentPage])
  return (
    <div className=''>
      <div className="text-gray-800  font-bold ml-3 py-2">{title?.toLocaleUpperCase()}</div>
      <div className='m-[5px] pt-[10px] flex flex-col min-w-fit h-fit bg-white min-h-[200px]'>

        <div className='overflow-x-scroll w-[90%]'>

          <table
            className="table-auto m-3 border-4"
          >
            {list?.length && (
              <thead className='shadow-md' >
                <tr >
                  <th ><p className='flex border-2 p-2 uppercase justify-between'>lasrraId<HiFilter /></p>
                  </th>
                  <th ><p className='flex border-2 p-2  uppercase justify-between'>firstname<HiFilter /></p>
                  </th>
                  <th ><p className='flex border-2 p-2 uppercase justify-between'>middlename <HiFilter /></p></th>
                  <th ><p className='flex border-2 p-2 uppercase justify-between'>surname <HiFilter /></p></th>
                  <th ><p className='flex border-2 p-2 uppercase justify-between'>primarY_PHONE_NO <HiFilter /></p></th>
                  {/* <th ><p className='flex border-2 p-2 uppercase justify-between'>status<HiFilter /></p></th> */}
                  {/* <th ><p className='flex border-2 p-2 uppercase justify-between'>comments<HiFilter /></p></th> */}
                </tr>
              </thead>
            )}
            {children}
            {/* <ListItems {...tableHeader }/> */}

            <tbody className="bg-white even:bg-red-300">
              {list && list.length > 0
                && list.map((card, idx) =>
                  idx >= start && idx < end
                  &&
                  <ListItems
                  add
                  remove
                    {...card}
                    batchStatus={batchStatus}
                    key={card.cardId + ' ' + idx}
                    active={active}
                    reset={reset}
                    setNewActive={setNewActive}
                  />
                )
              }
            </tbody>
          </table>
        </div>
        {list && list.length > 1 ? (
          <div className='flex-row border-2'>
            <div className='bg-gray-100 flex-row flex-1 text-center'>
              <div className='flex justify-between items-end'>
                <div className='flex'>

                <Pagination className="btn-success justify-center m-auto bg-slate-200 text-[2rem]">
                  <Pagination.Prev onClick={getPrev} />
                  {pageButtons}
                  <Pagination.Next onClick={getNext} />
                </Pagination>
                </div>

                {<div><p>{`Page ${currentPage + 1} of ${totalPages} pages`}</p></div>}

                {list?.length && list?.length > pageSize ? (
                  <div
                    className='flex justify-between  p-2 min-w-[200px] hover:underline'>

                    <p className='hover:text-blue-500 '><FaArrowUp

                      onClick={() => setPageSize(pageSize + 1)}
                    /></p>
                    Page Size:{pageSize}
                    <p className='hover:text-red-500'><FaArrowDown
                      className=''
                      onClick={() => pageSize > 20 && setPageSize(pageSize - 1)}
                    /></p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {currentCard.toString() !== '{}' && active === currentCard.cardId && (
          <EditCard {...currentCard} reset={reset} active={active} />
        )}
      </div>
    </div>
  )
}
