import React from 'react';
// import styled from 'styled-components';
import {BiUpArrowAlt} from "react-icons/bi"
// import { Div } from '../styles/styles';
import { LogoBox } from '../artifacts/Logo';
import logo2 from '../assets/images/logo2.png';
import { Link } from 'react-router-dom';
// const FlexDiv = styled(Div)`
// p{
//     color:white;
// }
// `

export function Footer() {
    return (
        <div className='w-[100vw] text-white flex justify-center py-5 h-fit bg-black  sticky '>
        {/* <LogoBox height={"80px"} width ={"200px"} src={logo2}/> */}
            <p>www.lasrra.com |  ©2020. | All rights reserved.</p>
            {/* <Link to="/batches">
            <BiUpArrowAlt style={{ fontSize: '4rem',color:"white", margin:"auto 1rem auto auto" }} />
            </Link> */}
        </div >
    );
}
