import axios from 'axios'
import React, { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { MainSearch, Search } from './Search';
import { Iselect } from '../interface/interface';


export const Select: React.FC<Iselect> = ({ options, path }) => {
  // const options = [1,2,3,4,5,32]
  const [showSearch,setShowSearch] =useState(false)
  const [search,setSearch] = useState(0)
  const navigate = useNavigate()
  const handleChange = (e: any) => {
    if(e.target.value==='new'){
        setShowSearch(true)
        return
    }
    console.log(e.target.value + 'Option selected')
    navigate(`${path}${e.target.value}`)
  }
  return (
    <label>
     { !showSearch ?"batch" :"Enter batch number for new receipt"}
      { !showSearch ?( <select defaultValue={''} onChange={(e) => handleChange(e)}>
        <option value={''}>select batch</option>

        { Array.isArray(options) && options.map((option, idx) => (
          <option value={option} key={""+idx+option}>
            {option}
          </option>
        ))}
        <option value ={"new"}>create new receipt</option>
      </select>) : (   <MainSearch listPath='a' to='/receipts/receipt' field={'Batch No'} padding={'0.5rem'} api={`/Batch/GetCardByBatchId?id=${search}`} search={search} onChange={(e) => setSearch(e.target.value)} />
)}
    </label>
  )
}

// export default Select
