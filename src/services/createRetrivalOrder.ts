import { Axios } from "../Axios/Axios"

export const createRetrivalOrder =async(payload:any)=>{
    return await Axios.post(
         'Relocation/CreateRetrievalOrder',
         payload,
       )
 }