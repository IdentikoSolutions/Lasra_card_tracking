import { Axios } from "../Axios/Axios"

export const createNewReceipt =async(details:any)=>{
    return await Axios.post('/receipt',details)

}