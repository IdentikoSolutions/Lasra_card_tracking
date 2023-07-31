import React from 'react';
import styled from 'styled-components';
import { Idiv, IinputFieldContainer } from '../interface/interface';

const Div=styled.div<Idiv>`
${({margin,bg})=>`
margin:${margin};
background-color:${bg};
`}
display:flex;
flex-wrap:wrap;
justify-content:space-between;
border-radius:8px;
border:3px solid #02390b;
min-height:50px;
width:"fit-container";
flex:1;
min-width:75%;
h3{
    margin:auto !important;
    width:"fit-content";
    text-justify:auto;
    justify-content:center;
    font-weight:bold;
}
`
export const  InputFieldContainer:React.FC<IinputFieldContainer>=({title,children})=>{
    return (
        <Div margin={"20px"} bg={"#d7f9ed"}>
            <h3>{title}</h3>
            <Div margin={'3px'} bg={"#ffffff"}>
{children}
            </Div>
        </Div>
    );
}
