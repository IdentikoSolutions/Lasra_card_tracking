import React, { useEffect, useState } from 'react'
import { Icard, IcardReceipt } from '../../interface/interface'
import { ButtonElement } from '../ButtonElement';
import { Axios } from '../../Axios/Axios'
import { FallbackRender } from '../../pages/errorpages/error'
import {  FlexRowSpaceBtw, OverlayCard } from '../../styles/styles'
import { useLocation } from 'react-router-dom';
interface Iarg {
  width?: string
  reset: (num?:number) => void
  active: number
}
export const EditCard: React.FC<Icard & Iarg> = (card) => {
  const [cardDetail, setCardDetail] = useState<IcardReceipt>({
    cardId: card.cardId||card.id,
    status: card.status,
    comment: card.comment,
  })
  const{cardId,status,comment} =cardDetail
  const api=useLocation().pathname
  console.log(api,'pathname')
  const handleEdit = async () => {
    try {
        if(api.substring(0,15)==='/receipts/cards'){
           const response = await Axios.post(`/Card/updateCardReceiptByCardid?cardId=${cardId}&status=${status}&comment=${comment}`)
// console.log(response, 'update response',card)
console.log("CARD")

        }else if(api.substring(0,15)==='/receipts/provi'){
          //Provisioning/updateCardProvisionByCardid?cardId=296&status=1&comment=recalled'
          const response = await Axios.post(`/Provisioning/updateCardProvisionByCardid?cardId=${cardId}&status=${status}&comment=${comment}`)
          console.log("PROVISIONING")


        }else{
          console.log("something is werong")
        }

      card.reset()
    } catch (e) {
      card.reset()
      return <FallbackRender />
    }
  }
  useEffect(()=>{

  },[card.active])
  return (
    <OverlayCard >
      {/* cardId */}
      <label htmlFor="cardId">
       <h2> cardId : {cardDetail.cardId}</h2>
        {/* <input
          name="cardId"
          type="number"
          value={cardDetail.cardId}
          onChange={(e) =>
            setCardDetail({ ...cardDetail, cardId: Number(e.target.value) })
          }
        /> */}
      </label>

      {/* status */}
      <label htmlFor="status">
        {' '}
        status:{' '}
        <input
          name="status"
          type="number"
          value={cardDetail.status===0?'':cardDetail.status}
          onChange={(e) =>
            setCardDetail({ ...cardDetail, status: Number(e.target.value) })
          }
        />
      </label>
      {/* comment */}
      <label htmlFor="comment">
        {' '}
        comment:{' '}
        <input
          name="comment"
          type="text"
          value={cardDetail.comment}
          onChange={(e) =>
            setCardDetail({ ...cardDetail, comment: e.target.value })
          }
        />
      </label>
      <FlexRowSpaceBtw>
      <ButtonElement onClick={handleEdit} label="Update" />
      <ButtonElement onClick={()=>card.reset(-1)} label="Cancel"/>
      </FlexRowSpaceBtw>
    
    </OverlayCard>
  )
}
