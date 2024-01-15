import React, { ReactNode, useEffect, useState } from 'react'
// import styled from 'styled-components';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from 'react-bootstrap/Pagination'

import {
  FlexCol,
  MainDiv,
  TitleDiv,
} from '../styles/styles'
import { Icard, IcardReceipt } from '../interface/interface'
import { ButtonElement } from './ButtonElement'
import { ListItems } from './ListItemsComponent/ListItems'
import { InputField } from './InputField'
import { color } from '../artifacts/colors'
import { EditCard } from './Modals/editCard'
interface IlistContainer {
  title?: string
  width?: string
  children?: ReactNode
  list?: Icard[] | IcardReceipt[]
  batchStatus?: number
}
export const ListContainer: React.FC<IlistContainer> = ({
  title,
  children,
  list,
  width,
  batchStatus,
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
        idx + 3 <= currentPage ||
        (currentPage + 3 >= idx && (
          <Pagination.Item
          className={`${idx===currentPage?'bg-green-500 border-green-700 border-2 text-white':""}`}
            onClick={() => currentPage < totalPages && setCurrentPage(idx)}
            key={idx}
          >
            {idx + 1}
          </Pagination.Item>
        ))
      )
    })
  useEffect(() => {}, [list])
  return (
    <div>
      <div className="text-gray-800  font-bold ml-3 py-2">{title?.toLocaleUpperCase()}</div>
      <MainDiv {...props}>
        {list?.length && list?.length > pageSize ? (
          <div
          className='flex justify-center my-2'>
            <button
            className='bg-green-500 text-white px-4 mx-4 rounded-md'
              onClick={() => setPageSize(pageSize + 1)}
            >+</button>
            Page Size:{pageSize}
            <button
              className='bg-green-500 text-white px-4 mx-4 rounded-md'
              onClick={() => pageSize > 20 && setPageSize(pageSize - 1)}
            >-</button>
          </div>
        ) : (
          ''
        )}
        <Table
          striped
          //  bordered
          hover
          variant="flat"
          size="xxl"
          className="mb-3"
        >
          {list?.length && (
            <thead>
              <tr>
                <th>lasrraId</th>
                <th>firstname</th>
                <th>middlename</th>
                <th>surname</th>
                <th>primarY_PHONE_NO</th>
                <th>status</th>
                <th>comments</th>
              </tr>
            </thead>
          )}
          {children}
          {/* <ListItems {...tableHeader }/> */}

          <tbody>
            {list && list.length > 0
              && list.map((card, idx) => 
                
                    idx >= start && idx < end
                
                  &&
                      <ListItems
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
        </Table>
        {list && list.length > 1 ? (
          <FlexCol>
            <FlexCol>
              {<div>{`Page ${currentPage} of ${totalPages} pages`}</div>}
              {/* <FlexRow> */}
              <div className='flex'>
              <Pagination className="btn-success">
                <Pagination.Prev className='' />
                {/* <ButtonElement onClick={getPrev} label={'Prev'} />   */}
                {pageButtons}
                {/* <ButtonElement onClick={getNext} label={'Next'} /> */}
                <Pagination.Next className=''/>
              </Pagination>
              </div>
            </FlexCol>
          </FlexCol>
        ) : (
          ''
        )}
        {currentCard.toString() !== '{}' && active === currentCard.cardId && (
          <EditCard {...currentCard} reset={reset} active={active} />
        )}
      </MainDiv>
    </div>
  )
}
