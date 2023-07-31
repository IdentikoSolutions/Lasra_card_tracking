import React from 'react';
import styled from 'styled-components';
import {BiUpArrowAlt} from "react-icons/bi"
import { Div } from '../styles/styles';
import { LogoBox } from '../artifacts/Logo';
import logo2 from '../images/logo2.png';
import { Link } from 'react-router-dom';
const FlexDiv = styled(Div)`
p{
    color:white;
}
`

export function Footer() {
    return (
        <FlexDiv>
        <LogoBox height={"80px"} width ={"200px"} src={logo2}/>
            <p> © The Lagos State Residents Registration Agency - 2020. All rights reserved.</p>
            <Link to="/batches">
            <BiUpArrowAlt style={{ fontSize: '4rem',color:"white", margin:"auto 1rem auto auto" }} />
            </Link>
        </FlexDiv>
    );
}
