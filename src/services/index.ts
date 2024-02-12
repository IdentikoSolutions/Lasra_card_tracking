import { Axios } from "../Axios/Axios"

export const getOneDeliveryOrder =async(id:string|undefined)=>{
    const {data} =await Axios.get(`Relocation/ViewRelocationOrdeByHeaderId?RetrievalOrderHeaderId=${id}`)
    return data;
}
export const requestByLgaCode = async(lgacode: string|undefined)=>{
    return await Axios.get(`/Relocation/ViewRelocationRequestByLGACode?FromLGACode=${lgacode}`,)
}
export const createRetrivalOrder =async(payload:any)=>{
   return await Axios.post(
        'Relocation/CreateRetrievalOrder',
        payload,
      )
}