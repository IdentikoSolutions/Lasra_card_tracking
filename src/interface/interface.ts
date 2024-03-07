import { ReactNode } from "react"
// import Provisioned from '../pages/Provisioned';

export interface Icard {
  batch: string
  contacT_LGA: string
  countrY_CODE:string
  currenT_HOUSE_NUMBER?: string
  currenT_STREET?: string
  currenT_TOWN?: string
  datE_BIRTH: string
  duplicatePAN?: boolean
  emaiL_ADDRESS?: string
  firstname: string
  flaT_NUMBER?:string
  id: number
  cardId:number
  lasrraId: string
  middlename: string
  primarY_PHONE_NO: string
  registratioN_DATE: string
  statE_OF_RESIDENCE: string
  status: number
  surname: string
  comment: string
  dispatcherName?: string,
  // dateCreated?:string,
  batchNo?:number
// cardReceivedOn?: string,
gender?: string,
card_Status?:number
}


export interface IbatchDetail{
bankDataCreatedOn?:string,
bankJobFilename?:string,
bankJobNo?:number,
batchNo:number,
cancelledStatus?:number,
dateCreated?:string,
description?:string,
enrolLG?:string,
expMth?:number,
expYear?:number,
destination?:string
id?:number,
idDataCreatedOn?:string,
noRecords?:number,
notes?:string,
perso?:string,
provisionedOn?:string,
submissionstatus?:number,
deliveredBy?:string,
receivedBy?:string
cards?:IcardReceipt[]
}
export interface IbatchReceipt{
  batch:number,
  // batchNo:number,
  receivedBy: string,
  deliveredBy:string,
  destination:string,
  dispatcherName:string,
  createdBy:string,
  batchDispatchStatus:number,
  noRecords:number,
  pickupDate:string,
  dispatchedOn:string,
  submissionstatus:number,
  cards:IcardReceipt[]
}
export interface IcardReceipt{
status:number
comment:string
cardId:number
}
export interface Iinput{
  label?:string,
  value?:string|number,
  onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void,
  onClick?:(e:any)=>void,
  width?:string|undefined,
  bg?:string,
  type?:string
  // inputProps?:any
}
export interface SearchParamsType {
  batchNo?:string,
  jobNo?:string,
  cardNo?:string,
  page?:string,
  pageSize?:string
}
export interface SearchType {
  field?: string
  padding?: string,
}
export interface IGridBox {
  template:string
}
export interface IinputFieldContainer{
  title: string;
  children?:ReactNode
  }
  export interface Idiv{
      margin:string,
      bg:string,
      direction?:string
  }
  export interface Ifield{
    bg:string,
    color:string
  }
  export interface Ireceipt{
batchProvisionHeader:ReceiptType,
cardsReceipt:Icard[]|IcardReceipt[]
  }
  export interface ReceiptType{
    batchNo:number,
dateCreated:string,
deliveredBy:string,
provisionedOn:string,
receivedBy:string,
record_count:number
status:number
submissionstatus:number
//
id?:number
receivedOn?:string
  }
  export interface Iselect {
  options?: number[]
  path: string,
  to?:string
  source?: string,
  searchId?:string
}
export interface Iimg {
  img:string
}
//interface for filter component
export interface IFilterProp {
  state: {
    batchId: number
    cardId: number
    comment: string
    surname: string
    firstname: string
    middlename: string
    lasrraid:string
    lga: string
  }
  setState:(state:IFilterProp['state'],title:string,arg:string)=>void

}
export interface Iorder {
  destination: string
  batchId: number
  dispatcherName: string
  pickUpDate: string
  noRecords?: number
  batchDispatchStatus: number
  cards: Icard[]
  receivedBy?: string,
  deliveredBy?: string,
  createdBy?: string,
  dispatchOrderOn?: string,

}
// export interface Order