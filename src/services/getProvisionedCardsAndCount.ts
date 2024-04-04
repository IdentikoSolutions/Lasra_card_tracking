import { Axios } from "../Axios/Axios";

export const getProvisionedCardsAndCount =async(provision_id:number)=>{
    try {
        //tobe correcetrf
        return await Axios.get('/cardProvision?provision_id=' + provision_id)
      } catch (e) {
        throw new Error("Couldn't complete the fetch");
      }
}