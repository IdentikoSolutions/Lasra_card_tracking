
import React, { useEffect } from 'react'
import { Icard, IcardReceipt } from '../../interface/interface';
// import { List } from '../../styles/styles'
import {AiOutlineEdit} from 'react-icons/ai'
export {}
// interface Ireset{
//   reset:(num?:number)=>void,
//   active:number,
//   batchStatus?:number,
//   setNewActive:(card: Icard)=>void
// }
  export const ListItems: React.FC<any> = (card) => {
  return (
    <tr className='even:bg-gray-200'>
      <td >{card.lassraId}</td>
      <td >{card.first_name}</td>
      <td >{card.middle_name}</td>
      <td >{card.surname}</td>
      <td>{card.primary_phone_no}</td>
      {/* <td>{card.status===0?"P":card.status===1?'NP':'To be determind'}</td> */}
      { <td >{card.comment && card.comment}</td>}
     <td><button onClick={()=>card.add(card.lassraId)}>add</button><button onClick={()=>card.add(card.lassraId)}>remove</button></td>
    </tr>

  )
}
