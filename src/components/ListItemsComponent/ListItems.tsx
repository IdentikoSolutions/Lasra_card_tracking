
import React, { useEffect } from 'react'
import { Icard } from '../../interface/interface';
import { List } from '../../styles/styles'
import {AiOutlineEdit} from 'react-icons/ai'
export {}
interface Ireset{
  reset:()=>void,
  active:number,
  batchStatus?:number,
  setNewActive:(card: Icard)=>void
}
//this component receives a card details and uses the fields: lasrraId,firstname,middlename,surname,primarY_pHONE_NO,status,comment to populate the columns
export const ListItems: React.FC<Icard & Ireset> = (card) => {
  console.log(card.batchStatus===0, "card from list")
  useEffect(()=>{
  },[card.cardId])
  return (
    <List>
      <div>
      <p style={{gridArea:"lasrraId",display:"block",}}>{card.lasrraId}</p>
      </div>
      <div>
      <p style={{gridArea:"firstname",display:"block",}}>{card.firstname}</p>
      </div>
      <div>
      <p style={{gridArea:"middlename",display:"block",}}>{card.middlename}</p>

      </div>
      <p style={{gridArea:"surname",display:"block",}}>{card.surname}</p>
      <p style={{gridArea:"phone",display:"block",}}>{card.primarY_PHONE_NO}</p>
      <p style={{gridArea:"status",display:"block",}}>{card.status===0?"received":card.status===1?'Not received':'To be determind'}</p>
      {card.comment && <p style={{gridArea:"comment",display:"block",}}>{card.comment}</p>}
     {card.batchStatus===0 && <button  style={{ gridArea:"edit",display:"block",margin:'3px'}}onClick={()=>card.setNewActive(card)}><AiOutlineEdit/></button>}
    </List>
  )
}
