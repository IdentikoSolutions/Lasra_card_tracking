import React from 'react';
import image from '../assets/pix2.jpeg'

import black from '../assets/black.png'
export const SumaryCard:React.FC<any> = ({name,value,main=black,sub =image}) => {
    return (
        <div
            className='flex flex-col items-center justify-evenly m-1 w-[200px] h-[100px] bg-center bg-contain relative bg-clip-content group overflow-clip hover:border-red-400 hover:border-4'
            style={{ backgroundImage: `url(${main})` }}

        >
            <div
                className='transition-all ease-linear animate-none w-[100px] h-[100px] rotate-[30deg] group-hover:rotate-0 bg-center rounded-full bg-contain absolute bottom-[-50px] right-[-50px]'
                style={{ backgroundImage: `url(${sub})` }}
            >
            </div>
            <h3 className='text-white '>{value}</h3>
<p className='text-white z-50'>{name}</p>


        </div>
    );
}
