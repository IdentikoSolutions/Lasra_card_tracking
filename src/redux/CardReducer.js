import { createSlice } from '@reduxjs/toolkit'
// import { Icard } from '../interface/interface'
// export {}
export const CardSlice = createSlice({
  name: 'Cards',
  initialState: {
    cards:[],
    reports: [],
    batchDetail: {},
    receipt:{}
  },
  reducers: {
    updateCard: (state, action) => {
      // console.log(state)
      const { cards, batchdetail ,reports} = action.payload
      return {
        cards,
        batchDetail: batchdetail,
        reports
      }
    },
    // this reset the state
    reset:(state,action)=>{
      console.log('reset executed')
return {
  cards:[],
  reports:[],
  batchDetail: {},
  receipt:{}
}
    },

    reportACard: (state, action) => {
      const { reports,cards,batchDetail } = action.payload
return {
  cards,batchDetail,reports
}      
    },

currentReceipt: (state,action)=>{
  // console.log(action.payload.data,"from currentrecept")
 return {
 ...state,receipt: action.payload.data
 } 
}

  },
})
//this is for the dispatch
export const { updateCard, reportACard,currentReceipt,reset } = CardSlice.actions
export default CardSlice.reducer
