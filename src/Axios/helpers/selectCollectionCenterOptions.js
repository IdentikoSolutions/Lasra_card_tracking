import { LGA } from '../utils'

export const selectCollectionCenter = () => {
  const getvalue = (item) => {
    let arr = item.split(' ')
    if(arr.length ===1) {
       
        return arr.join(' ')
        
    }else if(arr.length>1) {
        arr.pop()
        return arr.join(' ')
    } 
  }
  const options= LGA.map((lga) => ({ value: getvalue(lga.name), label: lga.name }))
  return options
}
