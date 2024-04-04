import { Axios } from "../Axios/Axios"

export const getDispatchOrders =async()=>{
    // const queryString = ''
    return await Axios.get("/dispatch/orders")
}
