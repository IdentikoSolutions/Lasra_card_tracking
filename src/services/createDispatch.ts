// import {Axios} fro
import { Axios } from "../Axios/Axios"

export const createDispatchOrder=async(data:any)=>{
    return await Axios.post('/dispatch',data)
}