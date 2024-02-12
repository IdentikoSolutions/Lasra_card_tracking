import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FaSearch } from 'react-icons/fa'
import AsyncSelect from 'react-select'
import { saveAs } from 'file-saver'
import {
  button,
} from '../styles/styles'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from "react-bootstrap/Form"
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
      // console.log('do search' + e.target.value)
      setIsActive(false)
    }
  }
  return (
    <div>
      <button onClick={handleSearchClick} className={button}>
        <FaSearch />
        {isActive ? '' : 'Search'}
        {isActive && <input type="search" placeholder="search..." />}
      </button>
    </div>
  )
}
// main search
interface SearchType {
  field?: string
  padding?: string
  listPath: string
  to: string,
  api: string
  search: number
  setToggle?: (newValue: boolean) => void
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
  listPath,
  api,
  to,
  search,
  setToggle,
  onChange,
}) => {
  console.log(listPath, 'listpath')
  const [selectList, setSelectList] = useState<[any] | []>([])
  const getAllBatches = useCallback(async () => {
    const { data } = await Axios.get(listPath) as any
    console.log(data, 'select list')
    setSelectList(data.map((item: any) => item))
  }, [listPath])
  const dispatch = useDispatch()
  const navigate: NavigateFunction = useNavigate()
  const rootState = useSelector((state) => {
    return state as IrootState
  })
  const handleSearch = async (e: any) => {
    e.preventDefault()
    if (!search) {

      setToggle && setToggle(false)
      return
    }
    // return
    try {
      const response = await Axios.get(api)
      console.log(response, 'response from search')
      if (response.status === 200) {
        const { data } = response
        const workingData = data.cards
          ? data.cards
          : data.cardReceipts
            ? data.cardReceipts
            : []
        const cards = workingData.map((card: Icard) => ({ ...card, status: 0 }))
        const batchDetail = data.cardReceiptHeader
          ? data.cardReceiptHeader
          : data.batchDetails
            ? data.batchDetails
            : []
        if (!batchDetail.noRecords) {
          batchDetail.noRecords = data.cardReceipts?.length
        }
        dispatch(
          updateCard({ ...rootState.Cards, cards, batchdetail: batchDetail }),
        )
        navigate(`${to}`);
      }
    } catch (e) {
      console.error(e, 'ERRROR')
    }
  }
  const handlechange = (e: any) => {
    onChange(e);
    handleSearch(e)
  }
  useEffect(() => {
    getAllBatches()
  }, [rootState, search, getAllBatches, listPath])
  return (
    <>
      <Form onSubmit={(e) => handleSearch(e)} className='flex'>
        <p className='text-green-700 align-middle'> SELECT BATCH: </p>
        <InputGroup className="text-green-700 w-200::after-input mb-2"
          style={{ width: '200px' }}
        >
          <Form.Select
            value={search === 0 ? "" : search}
            onChange={handlechange}
            placeholder={field}
          >
            <option className='bg-green-500'>Open to select batch</option>
            {selectList.length && selectList.map((item: any, idx: any) => <option value={item.batchNo} key={idx}><div className='flex justify-between bg-green-50 text-green-700'><p>Batch {item.batchNo}</p> <p>No of Records {item.noRecords}</p></div></option>)}
          </Form.Select>
          <InputGroup.Text className='bg-gray-500 border-dashed ' onClick={(e: any) => handleSearch(e)} id="search">search</InputGroup.Text>
        </InputGroup>
      </Form>
    </>

  )
}

//
//
//
export const MainSearch2 = ({ listPath, api, to }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectList, setSelectList] = useState()
  const rootState = useSelector(state => state as IrootState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getAllBatches = useCallback(async () => {
    const { data } = await Axios.get(listPath) as any
    console.log(data,'data')
    setSelectList(data.map((item: any) => ({
      value: item.batchNo, label: <div className='flex justify-between'>
        <p>{item.name || "Batch" + item.batchNo}</p>
        <p>{` ${item.noRecords || item.record_count} Cards`}</p>
        </div>
    })))
  }, [listPath])
  const handleChange = async (selectedOption) => {
    try {
      const response = await Axios.get(api + "=" + selectedOption.value)
      if (response.status === 200) {
        const { data } = response
        const workingData = data.cards
          ? data.cards
          : data.cardReceipts
            ? data.cardReceipts
            : []
        const cards = workingData.map((card: Icard) => ({ ...card, status: 0 }))
        const batchDetail = data.cardReceiptHeader
          ? data.cardReceiptHeader
          : data.batchDetails
            ? data.batchDetails
            : []
        if (!batchDetail.noRecords) {
          batchDetail.noRecords = data.cardReceipts?.length
        }
        // dispatch(reset({}))
        dispatch(
          updateCard({ ...rootState.Cards, cards, batchdetail: batchDetail }),
        )
        navigate(`${to}`);
      }
    } catch (e) {
      console.error(e, 'ERRROR')
    }
  }
  //  }
  useEffect(() => {
    console.log(selectedOption, selectList, 'selectedOption')

    getAllBatches()
  }, [getAllBatches])
  return <AsyncSelect
    className='hover:shadow-md'
    value={selectedOption}
    onChange={handleChange}
    options={selectList}
  />
}
