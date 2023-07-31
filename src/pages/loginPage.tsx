import React, { useState } from 'react';
import access from "../images/access.webp"
// import access from '../images/access.webp'

import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { Button, FitScreen, FlexRow, Input, Label, Overlay } from '../styles/styles';
import Logo from '../artifacts/Logo';
import styled from 'styled-components';
import { Iimg } from '../interface/interface';
const OverBox = styled(Overlay)<Iimg>`
`
const LoginPage = () => {
    const [isVisible,setIsVisible] =useState(false)
    return (
        <FitScreen>
            <Logo/>

            <OverBox img={access} >
                {/* username */}

                <FlexRow>
                    <Label htmlFor="username"> Username:</Label>
                <Input type="text" />
                </FlexRow>
                {/* passord */}
                <FlexRow>
                    <Label htmlFor="password"> Password:</Label>
                <Input type={ isVisible?"text":"password"}/>
                     {
                     isVisible?
                      <AiOutlineEyeInvisible style={{ margin:"auto auto",marginLeft:"-20px"}} onClick={()=>setIsVisible(!isVisible)}/>
                     : <AiOutlineEye style={{ margin:"auto auto",marginLeft:"-20px"}}  onClick={()=>setIsVisible(!isVisible)}/>
                    }
                {/* </Input> */}
                </FlexRow>
                {/* login */}
                <Button  style={{backgroundColor:"#02390B",borderRadius:"4px",color:"white",border:"none",padding:"1rem"}}>Login</Button>
            </OverBox>
        </FitScreen>
    );
};

export default LoginPage;