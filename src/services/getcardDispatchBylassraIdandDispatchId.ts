import { Axios } from "../Axios/Axios"
import { getDispatchById } from "./getDispatchById"

export const getcardDispatchBylassraIdandDispatchId =async(lassraId:string, dispatchId:number)=>{
   const dispatch= await getDispatchById(""+dispatchId )
   console.log(dispatch, 'DISPATCGGHJHH')

   if(dispatch){
    return dispatch.cardDispatch.filter((item:any)=>item.lassraId===lassraId)[0]
   }

}