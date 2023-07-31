import React from 'react';
import { FlexRowSpaceBtw } from '../styles/styles';

interface IaccordList{
batchno:number,
path: string,
currentActive?:number,
handleClick:(batchno:number)=>void;
}

export const AccordionOptions:React.FC<IaccordList>=({batchno,path,currentActive,handleClick})=> {
   
    return (
        <FlexRowSpaceBtw className={currentActive===batchno? "active" :"notActive"} onClick={()=> handleClick(batchno)}>
            <span> Batch {batchno} </span>
        </FlexRowSpaceBtw>
    );
}

export default AccordionOptions;