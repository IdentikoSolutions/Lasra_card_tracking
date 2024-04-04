import React from 'react';
import styled from 'styled-components';
import { Idiv, IinputFieldContainer } from '../interface/interface';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import "bootstrap/dist/css/bootstrap.min.css"
export const  InputFieldContainer:React.FC<IinputFieldContainer>=({title,children})=>{
    return (
        <Container className='mb-2 bg-white' 
        // style={{background:"#d7f9ed"}}
        >
            <h3>{title}</h3>
            <hr/>
            <Container 
            // style={{background:"#ffffff"}}
            >
                <Row>
{children}
                </Row>
            </Container>
        </Container>
    );
}
