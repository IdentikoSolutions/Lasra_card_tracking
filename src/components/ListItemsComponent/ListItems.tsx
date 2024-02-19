
import React, { useEffect } from 'react'
import { Icard, IcardReceipt } from '../../interface/interface';
// import { List } from '../../styles/styles'
import {AiOutlineEdit} from 'react-icons/ai'
export {}
interface Ireset{
  reset:(num?:number)=>void,
  active:number,
  batchStatus?:number,
  setNewActive:(card: Icard)=>void
}
  export const ListItems: React.FC<any> = (card) => {
  return (
    <tr className='even:bg-gray-200'>
      <td >{card.lasrraId}</td>
      <td >{card.firstname}</td>
      <td >{card.middlename}</td>
      <td >{card.surname}</td>
      <td>{card.primarY_PHONE_NO}</td>
      <td>{card.status===0?"P":card.status===1?'NP':'To be determind'}</td>
      {card.comment && <td >{card.comment}</td>}
     {card.batchStatus===0 && <button onClick={()=>card.setNewActive(card)}><AiOutlineEdit/></button>}
    </tr>

  )
}
