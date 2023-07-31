import React from 'react';
import { Field, FlexRow, Input, InputWrapper, Label } from '../styles/styles';
import { Ifield, Iinput } from '../interface/interface';
import { color } from '../artifacts/colors';
import styled from 'styled-components';
const Fields =styled(Field)<Ifield>`
`
export const InputField:React.FC<Iinput> = ({ label, onChange, onClick,...inputProps}) => {
  return (
    <InputWrapper onClick={onClick} style ={{ width:inputProps.width}}>
      {label && <Label style ={{ backgroundColor:inputProps.bg}}>{label}</Label>}
      <Input {...inputProps} onChange={onChange}  />
    </InputWrapper>
  );
};
// for details
export const DetailField:React.FC<Iinput>=({label,value})=>{
  return (
  <FlexRow>
   <Fields color="white" bg={color.auto}>{label}</Fields>
  <Fields  color ="black"bg={"white"}> {value}</Fields> 
</FlexRow>
)
}
