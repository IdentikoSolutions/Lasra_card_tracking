import { Axios } from "../Axios/Axios"

export const createNewProvision =async(details:any)=>{
    return await Axios.post('/provision',details)

}