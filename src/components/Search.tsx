import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import {
  Button,
  FlexSearch,
  SearchButton,
  SearchInput,
  WrapperDiv,
} from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import { reset, updateCard } from '../redux/CardReducer'
import { IrootState } from '../redux/store'
import { Icard } from '../interface/interface'
import { Axios } from '../Axios/Axios'
import { NavigateFunction, useNavigate } from 'react-router-dom'
export function Search() {
  const [isActive, setIsActive] = useState(false)
  //handle search
  const handleSearchClick = (e: any) => {
    if (isActive === false) {
      setIsActive(true)
      return
    }
    if (isActive) {
      console.log('do search' + e.target.value)
      setIsActive(false)
    }
  }
  return (
    <div>
      <Button onClick={handleSearchClick}>
        <FaSearch />
        {isActive ? '' : 'Search'}
        {isActive && <input type="search" placeholder="search..." />}
      </Button>
    </div>
  )
}
// main search
interface SearchType {
  field?: string
  padding?: string
  to:string,
  api: string
  search: number
  onChange: (e: any) => void
}
// This MainSearch component handles search for create receipt page and create provision receipt page
// it takes the props api- api to call in the search
// field- the title for the search
// search - the value of the search 
// onChange- a method for update the state of the search field
export const MainSearch: React.FC<SearchType> = ({
  field,
  padding,
  api,
  to,
  search,
  onChange,
}) => {
  // const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate:NavigateFunction =useNavigate()
  const rootState = useSelector((state) => {
    return state as IrootState
  })
  console.log( 'api',api)
  const handleSearch = async () => {
// return
    try {
      const response = await Axios.get(api)
      // console.log(response, 'from search')
      if (response.status === 200) {
        const { data } = response
        // console.log(data, 'from search')
        const workingData = data.cards
          ? data.cards
          : data.cardReceipts
          ? data.cardReceipts
          : []
          // console.log(workingData,'working Data')
        const cards = workingData.map((card: Icard) => ({ ...card, status: 0 }))
        const batchDetail = data.cardReceiptHeader
          ? data.cardReceiptHeader
          : data.batchDetails
          ? data.batchDetails
          : []
        if(!batchDetail.noRecords) {
          batchDetail.noRecords = data.cardReceipts?.length
        } 
        dispatch(reset({}))
        console.log(rootState,
          'ROOTSTATE BEFORE'
          )
          
        dispatch(
          updateCard({ ...rootState.Cards, cards, batchdetail: batchDetail }),
        )
        console.log(rootState,
          'ROOTSTATE AFTER'
          )
        navigate(`${to}`);
        // return cards
      }
    } catch (e) {
      console.error(e,'ERRROR')
    }
  }
  useEffect(() => {}, [rootState])
  return (
    <FlexSearch style={{ padding }}>
      {/* <span>Enter Batch No: </span> */}
      <WrapperDiv>
        <SearchInput
          type="search"
          value={search===0? "" :search}
          onChange={onChange}
          placeholder={field}
        />
        <SearchButton onClick={handleSearch}> SEARCH</SearchButton>
      </WrapperDiv>
    </FlexSearch>
  )
}
