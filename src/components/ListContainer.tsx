import React, { ReactNode, useEffect, useState } from 'react'
// import styled from 'styled-components';
import {
  FlexCol,
  FlexRow,
  List,
  MainDiv,
  TitleDiv,
} from '../styles/styles'
import { Icard } from '../interface/interface'
import { ButtonElement } from './ButtonElement'
import { ListItems } from './ListItemsComponent/ListItems'
import { InputField } from './InputField'
import { color } from '../artifacts/colors'
import { EditCard } from './Modals/editCard'
interface IlistContainer {
  title?: string
  width?: string
  children?: ReactNode
  list?: Icard[]
  batchStatus?:number
}
export const ListContainer: React.FC<IlistContainer> = ({
  title,
  children,
  list,
  width,
  batchStatus,
  ...props
}) => {
  // console.log(batchStatus,'List container')
  const [pageSize, setPageSize] = useState(20)
  const [pageNumber, setPageNumber] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [active, setActive] = useState(-1)
  const [currentCard, setCurrentCard] = useState<Icard>({})
  const reset = (num?: number) => {
    if (num) return setActive(num)
    setActive(-1)
  }
  function setNewActive(card: Icard) {
    if (active !== -1 && active === card.cardId) return reset(-1)
    // reset()
    if(active!==-1)return
    setActive(card.cardId)
    setCurrentCard(card)
  console.log(currentCard, 'from setNewActive')

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
          <ButtonElement
            key={idx}
            onClick={() => currentPage < totalPages && setCurrentPage(idx)}
            label={(idx + 1).toString()}
          />
        ))
      )
    })
  useEffect(() => {
    // console.log('List container rerendered', active, currentCard.cardId)/
  }, [currentCard])
  return (
    <div>
      <TitleDiv>{title}</TitleDiv>
      <MainDiv {...props}>
        {list?.length && list?.length > pageSize ? (
          <FlexRow>
            <ButtonElement
              onClick={() => setPageSize(pageSize + 1)}
              label={'+'}
            />
            Page Size:{pageSize}
            <ButtonElement
              onClick={() => pageSize > 20 && setPageSize(pageSize - 1)}
              label={'-'}
            />
          </FlexRow>
        ) : (
          ''
        )}
        {list?.length ? (
          <List>
            <p>lasrraId</p>
            <p>firstname</p>
            <p>middlename</p>
            <p>surname</p>
            <p>primarY_PHONE_NO</p>
            <p>status</p>
            <p>comments</p>
          </List>
        ) : (
          ''
        )}
        {children}
        {/* <ListItems {...tableHeader }/> */}
        {list &&
          list.length > 0 ?
          (list
            // .filter((card, idx) => idx >= start && idx < end)
            .map((card, idx) => {
              if (idx >= start && idx < end) {
                return <ListItems {...card} batchStatus={batchStatus} key={'key' + card.lasrraId} active={active} reset={reset} setNewActive={setNewActive} />

              }
            }))
          :

          ''

        }

        {list && list.length > 1 ? (
          <FlexCol>
            <FlexCol>
              {<div>{`Page ${currentPage} of ${totalPages} pages`}</div>}
              <FlexRow>
                <ButtonElement onClick={getPrev} label={'Prev'} />
                {pageButtons}
                <ButtonElement onClick={getNext} label={'Next'} />
                <InputField
                  label={'Go to'}
                  type="number"
                  bg={color.action}
                  width={'150px'}
                  value={pageNumber === 0 ? '' : pageNumber}
                  onClick={getPageNumber}
                  onChange={(e: any) => {
                    if (e.target.value < 0) {
                      setPageNumber(1)
                    } else if (e.target.value > totalPages) {
                      setPageNumber(totalPages)
                    } else {
                      setPageNumber(e.target.value)
                    }
                  }}
                />
              </FlexRow>
            </FlexCol>
          </FlexCol>
        ) : (
          ''
        )}
        {
           active === currentCard.cardId &&
          <EditCard {...currentCard}  reset={reset} active={active} />}
      </MainDiv>
    </div>
  )
}
