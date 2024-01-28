import React,{createContext,useContext, useRef, useState} from 'react';
// import { IRequest } from '../../pages/homedelivery/AllDeliveryRequest';


const AppContext = createContext({});
export function useApp(){
    return useContext(AppContext)
}

export const AppContextProvider:React.FC<any> =({children}) =>{
const [pageName, setPageName] = useState('Home')
const [user,setUser]= useState('')
const printRef = useRef()


const contextData = {pageName,setPageName,printRef,user,setUser}
    return (
        <AppContext.Provider value={contextData}>
            {children}
        </AppContext.Provider>
    );
}

// export default DeliveryContext;