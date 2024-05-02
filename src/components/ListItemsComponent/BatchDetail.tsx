import React, { memo, useCallback } from 'react';
// import { List } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';
// import { isDate } from 'util/types';
interface Field {
  field: string[];
  receiptPath: string
  onClick?: (event: any) => void
  receipt?: any
  style?:string
}
// export
const BatchDetail: React.FC<Field> = ({ field, receiptPath, onClick,receipt,style }) => {
  console.log(receiptPath, "receipt path")
  // if(field.includes(dispatchStatus){

  // })
  // console.log(field,"field")
  const navigate = useNavigate()
  const handleclick = useCallback((batchnumber: number) => {
    if (receiptPath === "") {
      // onClick()
      return
    }
    if (receiptPath === '/receipt') {
      // navigate(`/receipts/cards?batch=${batchnumber}`)
      navigate(`/receipts/cards?receiptId=${batchnumber}`)
    } else if (receiptPath === '/Provisioning/ViewAllProvisionedBatches') {
      navigate(`/receipts/receipts?batch=${batchnumber}`)
    } else {
      console.log(receiptPath)
      navigate(receiptPath,{state:{receipt}})
    }
  }, [])
  return (
    <tr className={`border hover:bg-gray-300 text-center `+ style ? style : ' bg-white even:bg-gray-500'} onClick={() => handleclick(Number(field[0
    ]))}>
      {field.map((item, idx) => <td key={idx}>{item}</td>)}

    </tr>
  );
};
export default memo(BatchDetail)

export const DispatchDetail: React.FC<Field> =({ field, receiptPath, onClick,receipt }) => {
  
  console.log(field,"field")
  const navigate = useNavigate()
  const handleclick = useCallback((batchnumber: number) => {
    
      navigate(receiptPath,{state:{receipt}})
  }, [])
  return (
    <tr className='border bg-white even:bg-gray-500 hover:bg-gray-300 text-center' onClick={() => handleclick(Number(field[1
    ]))}>
      {field.map((item, idx) => <td key={idx}>{item}</td>)}

    </tr>
  );
};
// export default memo(DispatchDetail)