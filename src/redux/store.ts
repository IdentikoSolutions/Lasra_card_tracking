import { configureStore } from "@reduxjs/toolkit";
import CardReducer from "./CardReducer";
// import AuthReducer from "./AuthReducer";
import { IbatchDetail, Icard, Ireceipt } from "../interface/interface";
export interface IrootState{
    Auth:any,
    Cards:{
cards:Icard[],
batchDetail:IbatchDetail,
reports:Icard[],
receipt?:Ireceipt
    }
}
export default configureStore({
    reducer:{
        // Auth:AuthReducer,
        Cards:CardReducer
    }
})