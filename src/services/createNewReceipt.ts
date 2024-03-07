import { Axios } from "../Axios/Axios"

export const createNewReceipt =async(details:any)=>{
    console.log(details,' from creat new request')
    return await Axios.post('/receipt',details)

}