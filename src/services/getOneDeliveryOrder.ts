import {Axios} from '../Axios/Axios'
export const getOneDeliveryOrder =async(id:string|undefined)=>{
    const {data} =await Axios.get(`Relocation/ViewRelocationOrdeByHeaderId?RetrievalOrderHeaderId=${id}`)
    return data;
}