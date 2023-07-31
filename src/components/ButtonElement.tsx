import React from 'react';
import styled from 'styled-components';
import { color } from '../artifacts/colors';
interface Ibutton  extends React.InputHTMLAttributes<HTMLInputElement>{
label: string,
onClick?:()=>void,
// background?:string

// padding?:string
// children?:buttonProps
}
const Button = styled.button`
 padding:0.5rem 1rem;
width:fit-content;
height:fit-content;
font-size:1rem;
font-weight:700;
border:none;// 3px solid #67f835;
border-radius:8px;
color:#fff;
background-color: #02390B;
box-shadow:2px 5px 0 ${color.grey};
transition:all 0.1s linear;
:active{
  box-shadow:0 2px 0 ${color.grey};
  transform:translateY(2px);
  
}

`
export const  ButtonElement:React.FC<Ibutton> = ({...buttonProps})=> {
    return (
        <>
            <Button onClick={buttonProps.onClick}>{buttonProps.label}</Button>
        </>
    );
}
