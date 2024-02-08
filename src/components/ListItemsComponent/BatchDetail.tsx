import React, { memo, useCallback } from 'react';
// import { List } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';
import { isDate } from 'util/types';
interface Field {
  field: string[];
  receiptPath: string
}
// export
const BatchDetail: React.FC<Field> = ({ field, receiptPath }) => {
  const navigate = useNavigate()
  const handleclick = useCallback((batchnumber: number) => {
    if (receiptPath === "") return
    if (receiptPath === '/Card/getAllCardReceipt') {
      navigate(`/receipts/cards?batch=${batchnumber}`)
    } else if (receiptPath === '/Provisioning/ViewAllProvisionedBatches') {
      navigate(`/receipts/receipts?batch=${batchnumber}`)
    } else {
      navigate(receiptPath)
    }
  }, [])
  return (
    <tr onClick={() => handleclick(Number(field[0]))}>
      {field.map((item, idx) => {
        // if(new Date(item).getMonth() > -1){
        //   item= item.substring(0,10)
        // }
        // console.log(new Date(item).getMonth() + '...'+ idx)
        return <td key={idx}>{item}</td>
      })}

    </tr>
  );
};
export default memo(BatchDetail)