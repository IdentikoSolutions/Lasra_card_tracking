import React from 'react'
import { IFilterProp } from '../interface/interface'
import { Input } from '../styles/styles'
import styled from 'styled-components'
const FilterInput =styled(Input)`
// width:50px;
border-radius:0;
margin:5px;
max-width:80px;
box-shadow:3px 5px;
`
export const Filter:React.FC<IFilterProp> = ({state,setState}) => {
  return <div>
  <FilterInput type='number' placeholder='batchno' value={state.batchno===0?'':state.batchno} onChange={(e)=>setState(state,'batchno',e.target.value)} />
  <FilterInput type='number' placeholder='cardId' value={state.cardId===0?'':state.cardId} onChange={(e)=>setState(state,'cardId',e.target.value)} />
  <FilterInput type='text' placeholder='comment' value={state.comment} onChange={(e)=>setState(state,'comment',e.target.value)} />
  <FilterInput type='text' placeholder='surname' value={state.surname} onChange={(e)=>setState(state,'surname',e.target.value)} />
  <FilterInput type='text' placeholder='firstname' value={state.firstname} onChange={(e)=>setState(state,'firstname',e.target.value)} />
  <FilterInput type='text' placeholder='middlename' value={state.middlename} onChange={(e)=>setState(state,'middlename',e.target.value)} />
  <FilterInput type='text' placeholder='lasrraid' value={state.lasrraid} onChange={(e)=>setState(state,'lasrraid',e.target.value)} />
  <FilterInput type='text' placeholder='lga' value={state.lga} onChange={(e)=>setState(state,'lga',e.target.value)} />

  </div>
}
