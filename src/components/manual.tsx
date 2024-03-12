import React, { useState } from 'react';
import { Idiv } from '../interface/interface';
import { ListContainer } from './ListContainer';
import { button } from '../styles/styles';
import { fetchOneCard } from '../services';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

//WILL Receive list from parent, should updaate the list from parent,
//should also  receive batchnO from parent
export const Manual = ({ manualbatch, batchNo, updateCards }) => {
    const [id, setId] = useState<string>('')
    const fetchCard = async () => {
        const newcard = await fetchOneCard(id, batchNo)
        const isCardAdd =manualbatch.find(card=>card.lassraId===id)
        if(isCardAdd)return toast.error(<><h3>Error</h3> <p>Card already added</p></>)
       if(newcard){
        console.log(newcard, "new cards",id,batchNo)
        updateCards([...manualbatch, newcard])
   
       }  }
    const removeCard = async (lassraId) => {
        const newlist = manualbatch.filter(card => card.lassraId !== lassraId)
        updateCards(newlist)
    }
    return (
        <div className="min-h-[3rem] w-full ">
            <div className='flex items-center'>
                <label htmlFor='lassraId' className='text-green-900 font-bold text-center shadow-md'> Lassra Id: </label> <input type="text" id='lassraId'  className='mx-4 h-fit py-1 shadow-md'  value={id} onChange={(e) => setId(e.target.value)} /> <button className={button} onClick={fetchCard}>Add</button>
            </div>
            {manualbatch.length > 0 && <ListContainer title="CARDS" list={manualbatch} add={() => ''} remove={removeCard} />}
            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}
