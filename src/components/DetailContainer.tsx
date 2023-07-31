import React from 'react';
import { DetailWrapper } from '../styles/styles';
import { Idiv, IinputFieldContainer } from '../interface/interface';
import styled from 'styled-components';
const DetailWrapperbox= styled(DetailWrapper)<Idiv>`
`
export const DetailContainer: React.FC<IinputFieldContainer> = ({title,children})=> {
    return (
        <DetailWrapperbox direction="column" margin={"20px"} bg={"#d7f9ed"}>
        <h3>{title}</h3>
        <DetailWrapperbox style={{display:'flex',flexWrap:'wrap'}} direction={"row"} margin={'3px'} bg={"#ffffff"}>
{children}
        </DetailWrapperbox>
    </DetailWrapperbox>
    );
}

// export default DetailContainer;