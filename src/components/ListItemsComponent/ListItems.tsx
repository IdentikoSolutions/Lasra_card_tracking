
import React from 'react'
// import { Icard, IcardReceipt } from '../../interface/interface';
// import { List } from '../../styles/styles'
// import { AiOutlineEdit } from 'react-icons/ai'
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import {button} from '../../styles/styles'
export { }
// interface Ireset{
//   reset:(num?:number)=>void,
//   active:number,
//   batchStatus?:number,
//   setNewActive:(card: Icard)=>void


// }
export const ListItems: React.FC<any> = ({ add, remove, ...card }) => {
  // console.log(card)
  
return (
  <tr className='even:bg-gray-200'>
    <td >{card.lassraId}</td>
    <td >{card.first_name}</td>
    <td >{card.middle_name}</td>
    <td >{card.surname}</td>
    <td>{card.primary_phone_no}</td>
    {/* <td>{card.status===0?"P":card.status===1?'NP':'To be determind'}</td> */}
    {<td >{card.comment && card.comment}</td>}
    <td>{add && <button className={button + " !bg-green-100"} onClick={() => add(card.lassraId)}><FaCheck className="text-gray-700"/>
</button>}{remove && <button className={button+ " !bg-red-100"} onClick={()=>remove(card.lassraId)}><IoClose className='text-gray-900' />
</button>}</td>
  </tr>

)
}

