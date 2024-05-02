import { Axios } from "../Axios/Axios"

export const getDispatchById=async(id:string|undefined)=>{
    const result = await Axios.get(
        `/dispatch/${id}`
      )
    return result.data}