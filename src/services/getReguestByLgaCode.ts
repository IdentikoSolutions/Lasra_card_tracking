import { Axios } from "../Axios/Axios"

export const requestByLgaCode = async(lgacode: string|undefined)=>{
    return await Axios.get(`/Relocation/ViewRelocationRequestByLGACode?FromLGACode=${lgacode}`,)
}