import React,{createContext,useContext, useState} from 'react';
import { IRequest } from '../../pages/homedelivery/AllDeliveryRequest';


const DeliveryContext = createContext({});
export function useDelivery(){
    return useContext(DeliveryContext)
}

export const DeliveryContextProvider:React.FC<any> =({children}) =>{
const [mode,setMode] = useState(false)
const [current,setCurrent] = useState(-1)
const [request, setRequest] = useState<any[]>([])
const [orderlist,updateOrderlist]=useState([])


const contextData = {mode,setMode,current,setCurrent,request,setRequest,orderlist,updateOrderlist}
    return (
        <DeliveryContext.Provider value={contextData}>
            {children}
        </DeliveryContext.Provider>
    );
}

// export default DeliveryContext;