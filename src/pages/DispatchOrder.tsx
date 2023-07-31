import React, { useEffect, useState } from 'react'
// import DetailContainer from '../components/DetailContainer'
import { InputField, InputFieldContainer } from '../components'
import { color } from '../artifacts/colors'
import { FlexRow, NumberInput, WrapperDiv } from '../styles/styles'
import styled from 'styled-components'
import { OrderBatchSummary, data1 } from '../components/ListItemsComponent/OrderBatchSummary';
import { IFilterProp } from '../interface/interface'
import { Filter } from '../components/Filter'
const FlexX = styled(FlexRow)`
  width: fit-content;
  align-content: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  h2 {
    margin: 0;
  }
  button {
    width: fit-content;
  }
  h3 {
    margin: 0;
  }
`
export const DispatchOrder = () => {
  const [receiptDetail, setReceiptDetail] = useState({
    destination: '',
    dispatcher: '',
    pickupdate: '',
    noOfCard: '',
  })
  const [filter,setFilter]= useState<IFilterProp['state']>( {
    batchno: 0,
    cardId: 0,
    comment: '',
    surname: '',
    firstname: '',
    middlename: '',
    lasrraid:'',
    lga: ''
  })
  function setState(statevalue:IFilterProp['state'],title:string,value:string){
        setFilter({...statevalue, [`${title}`]:value})
  }
  const [batches, setBatches] = useState<number[]>([])
  const [input, setInput] = useState(0)
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      if (batches.includes(Number(input))) return
      setBatches([...batches, input])
      console.log(batches)
      setInput(0)
    }
  }
  const removeItem = (idx: number) => {
    console.log(idx)
    batches.splice(idx, 1)
    console.log(batches)
    const newBatches = [...batches]
    setBatches(newBatches)
  }
  useEffect(() => {}, [batches])
  return (
    <div>
      <FlexX>
        {' '}
        <h2>Batches:</h2>
        <FlexX>
          {' '}
          {batches.length > 0 &&
            batches.map((batch, idx) => (
              <button onClick={() => removeItem(idx)}>
                {' '}
                <span> {batch} </span>
                <span style={{ fontWeight: 'bold', color: '#ccc' }}>x</span>
              </button>
            ))}
        </FlexX>
        <NumberInput
          type="number"
          value={input === 0 ? '' : input}
          onChange={(e) => setInput(Number(e.target.value))}
          onKeyDownCapture={handleKeyDown}
        />
      </FlexX>
      <Filter state={filter} setState={setState}/>

      <InputFieldContainer title={'Order Details: '}>
        <InputField
          label="Destination:"
          value={filter.lga}
          onChange={(e) =>
            setFilter({ ...filter, lga: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="Dispatcher's Name:"
          value={receiptDetail.dispatcher}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, dispatcher: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="Pickup Date:"
          value={receiptDetail.pickupdate}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, pickupdate: e.target.value })
          }
          bg={color.action}
        />
        <InputField
          label="No of Cards:"
          value={receiptDetail.noOfCard}
          onChange={(e) =>
            setReceiptDetail({ ...receiptDetail, noOfCard: e.target.value })
          }
          bg={color.action}
        />
      </InputFieldContainer>
      <WrapperDiv>
        <OrderBatchSummary {...data1} />
      </WrapperDiv>
    </div>
  )
}
