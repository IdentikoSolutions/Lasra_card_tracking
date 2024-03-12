import { Axios } from "../Axios/Axios"

export const fetchOneCard = async (lassraId: string, batchNo: string) => {
    
    if(!lassraId.length)return
    const {data} =  await Axios.get(`/card/one/${lassraId}?batchNo=${batchNo}`)
    return data
}