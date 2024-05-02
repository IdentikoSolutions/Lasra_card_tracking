import { Axios } from "../Axios/Axios"

export const acknowledgeDispatch=async(dispatch:any)=>{
    try{
       return await Axios.patch(`/dispatch/${dispatch.id}`, dispatch)

    }catch(e:any){
        throw new Error(e )
    }
}