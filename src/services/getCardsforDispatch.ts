import { Axios } from "../Axios/Axios"

export const getCardsForDispatch =async (batchNo:number,collectionCenter:string,lassraId:string)=>{
   try{
   const result =await Axios.get(`/dispatch?batchNo=${batchNo}&collectionCenter=${collectionCenter}&lassraId=${lassraId}`)
   console.log(result,"getCardsforDispatch")
 return  result.data.map((item: any)=>({lassraId:item.lassraId,destination:item.collectionCenter}))

   }catch(e:any){
      throw new Error(e)
   }

}