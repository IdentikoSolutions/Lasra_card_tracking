import React from 'react';
import { List } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';
interface Field{
field: string[];
receiptPath:string
}
export const BatchDetail:React.FC<Field> = ({field,receiptPath}) => {
    const navigate = useNavigate()
    const handleclick= (batchnumber: number)=> {
      console.log(receiptPath,"from batch details")
        if (receiptPath === '/Card/getAllCardReceipt') {
          navigate(`/receipts/cards/${batchnumber}`)
        } else if (receiptPath === '/Provisioning/ViewAllProvisionedBatches') {
          navigate(`/receipts/provision/${batchnumber}`)
        }
      }
    return (
        <List onClick={()=>handleclick(Number(field[0]))}>
            {field.map(item=><p key={item}>{item}</p>)}
            
        </List>
    );
};
