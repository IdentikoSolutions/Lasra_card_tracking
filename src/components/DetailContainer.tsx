import React from 'react';
import { DetailWrapper } from '../styles/styles';
import { Idiv, IinputFieldContainer } from '../interface/interface';
import styled from 'styled-components';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import "bootstrap/dist/css/bootstrap.min.css";

export const DetailContainer: React.FC<IinputFieldContainer> = ({title,children})=> {
    return (
        <Container className='mb-2' style={{background:"#d7f9ed"}}>

        <h3>{title}</h3>
        <hr/>
        <Container className="d-grid"  style={{background:"#fff"}}>
        <Row>
        {children}
        </Row>
        </Container>
    </Container>

    );
}

// export default DetailContainer;