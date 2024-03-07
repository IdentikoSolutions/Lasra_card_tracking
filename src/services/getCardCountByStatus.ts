import { Axios } from "../Axios/Axios"
//get cards by batchNo and status. use to get Not received cards
export const getCardCountByStatus=async(batchNo:string, status:number,)=>{
    try{
        const count = await Axios.get(`/card/count?batchNo=${batchNo}&status=${status}`)
        return count.data
    }catch(e){
        console.log(e, "Count")

        throw new Error('faild to fetch count')
    }
}