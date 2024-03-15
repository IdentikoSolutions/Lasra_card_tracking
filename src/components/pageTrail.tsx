import React from 'react';
import { useLocation } from 'react-router-dom'
import { GoHome } from "react-icons/go";
// import { SumaryCard } from './SumaryCard';
// import blue from '../assets/blue.jpeg'
// import purple from '../assets/purple.jpeg'
// import red from '../assets/galaxy.jpeg'
// import gift from '../assets/gift.html'
export const PageTrail = () => {
   

    const { pathname } = useLocation()
    const paths = pathname.split("/")
    paths.shift()
    paths.shift()

    return (
        <div className=' my-[15px] mx-12'>
            <h2 className='capitalize text-[0.8rem]'>{paths.length < 1 ? "Home" : paths[paths.length - 1]}</h2>
            <div className='flex flex-row items-center'>
                <GoHome className='text-gray-400 font-bold text-[28px] mr-4' />
                <>
                    {paths.map((item, idx) => (<div key={idx} className={`${idx !== paths.length - 1 ? 'text-slate-300 ' : 'text-gray-400'} ml-1 leading-[0] pt-2 flex items-center text-center`}><div className='rotate-[30deg] h-4 border-l-2 border-gray-400 p-[8px] text-center capitalize'></div><p>{item}</p></div>))}
                </>
            </div>
            {/* <SumaryCard name='Total batches' value='1,234'/> */}

        </div>
    );
}


// export default pageTrail;