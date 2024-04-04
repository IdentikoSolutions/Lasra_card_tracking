import React, { useEffect, useState } from 'react';
import { Axios } from '../../Axios/Axios';
// import Logo from '../../artifacts/Logo';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'

 function ViewAllHomeDelivery() {
    const [list,updateList] = useState([])
    const getAllDeliveryOrder =async()=>{
        try{
const result = await Axios.post('Delivery/FetchDeliveryOrder?deliveryOrderId=0')
updateList(result.data)
console.log(result,'all order',list)
        }catch(e){
console.log(e)
        }
    }
    useEffect(()=>{
        getAllDeliveryOrder()
    },[])
    return (
      <>
            <h1>Delivery Orders</h1>
        {list.length > 0 ? (<Table
        striped
         bordered
         hover
         variant="flat"
         size="xxl"
         className="mb-3">

          <thead><tr>
          <th>Request Id :</th>
          <th>CardId :</th>
          <th>Lasrra Id :</th>
          <th>Created by:</th>
          <th>Dispatcher:</th>
          <th>Pickup Date:</th>
          {/* <th>Collection Center:</th> */}
          </tr></thead>
          <tbody>
            {list.map((item:any,idx)=><tr key={idx}>
            <td>{item.id}</td>
            <td>{item.cardId}</td>
               <td>{item.lasrraId}</td>
            <td>{item.createdBy}</td>
            <td>{item.dispatcherName}</td>
            <td>{item.pickUpDate}</td>
            {/* <td>{item.fromLocationCode}</td> */}
            </tr> )}
          </tbody>

        </Table>):(<p> There is not pending request at the moment</p>)
        }
      </>

    );
}

// const OrderCard: React.FC<any> = ({ item }) => {
//     return (
//       <div className="w-[600px] flex  h-fit shadow-md min-h-[300px] bg-red my-3  rounded-md  ">
//         <div className="!bg-green-500 w-[25px] min-h-[300px]"></div>
//         <div className="flex-col w-[500px] ml-3">
//           <div className="w-[100%] flex justify-end">
//             <Logo />
//           </div>
//           <h4 className="text-bold text-center">Complete the Order detail</h4>
  
//           <div className="rounded-sm h-fit flex flex-col m-auto">
//             <div>
//               <label
//                 htmlFor="creator"
//                 className="w-[150px] bg-gray-400 p-2 my-2 ml-2 mr-0 rounded-tl-md rounded-bl-md"
//               >
//                 Creator name :
//               </label>
//               <input
//                 className="border-gray-400 border-1 p-2 w-[200px] rounded-tr-md rounded-br-md"
//                 type="text"
//                 id="creator"
//                 value={item.name}
//                 onChange={() => ''}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="dispatcher"
//                 className="bg-gray-400 w-[150px] p-2 my-2 ml-2 mr-0 rounded-tl-md rounded-bl-md"
//               >
//                 dispatch name
//               </label>
//               <input
//                 type="text"
//                 className="border-gray-400 border-1 p-2 w-[200px] rounded-tr-md rounded-br-md"
//                 id="dispatcher"
//                 value={item.dispatcher}
//                 onChange={() => ''}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="date"
//                 className="bg-gray-400 w-[150px] p-2 my-2 ml-2 mr-0 rounded-tl-md rounded-bl-md"
//               >
//                 pickup date
//               </label>
//               <input
//                 type="date"
//                 className="border-gray-400 border-1 p-2 w-[200px] rounded-tr-md rounded-br-md"
//                 id="creator"
//                 value={item.pickup_date}
//                 onChange={() => ''}
//               />
//             </div>
//           </div>
//           <div className=" grid grid-cols-2 gap-3">
//             <p className="text-[900] mr-3 ">
//               <span className="font-bold">Lasrra Id : </span>
//               <span className="underline w-[200px]">
//                 {item.lasrraId + '  '}{' '}
//               </span>{' '}
//             </p>
//             <p className="text-bold">
//               <span className="font-bold">Card Id : </span>{' '}
//               <span className="underline w-[200px]">{item.cardId + '  '} </span>{' '}
//             </p>
//             <p className="text-bold mr-3">
//               <span className="font-bold">Request Id : </span>{' '}
//               <span className="underline w-[200px]">{item.id + '  '} </span>{' '}
//             </p>
//             <p className="text-bold mr-3">
//               <span className="font-bold"> Collection center:</span>{' '}
//               <span className="underline w-[200px]">
//                 {item.fromLocationCode + '  '}{' '}
//               </span>{' '}
//             </p>
//             <p className="text-bold mr-3">
//               <span className="font-bold">Date created : </span>{' '}
//               <span className="underline w-[200px]">
//                 {item.updatedAt + '  '}{' '}
//               </span>{' '}
//             </p>
//           </div>
//         </div>
//       </div>
//     )
//   }
  
export default ViewAllHomeDelivery;