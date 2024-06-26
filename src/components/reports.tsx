import React from 'react'
import { SumaryCard } from "./SumaryCard"

import blue from '../assets/blue.jpeg'
import purple from '../assets/purple.jpeg'
import red from '../assets/galaxy.jpeg'
export const Reports:React.FC<any> = ({reportData}) => {
    console.log(reportData)
    // const reportData = [{

    //     name: 'Batch Total', value: '2,500', main: blue, sub: ''
    // }, {
    //     name: 'Total Recieved', value: '2,350', main: purple, sub: ''
    // }, {
    //     name: 'Total Provisioned', value: '2,348', main: red, sub: ''
    // }]
    return (<>
        <h3>Batch report</h3>
        <div className='flex justify-evenly border-2 flex-wrap'>
        {
            reportData?.map((item: { name: any; value: any; main: any; sub: any }, idx: any) => <SumaryCard name={item.name} value={item.value} main={item.main} sub={item.sub} key={idx} />)
        }
    </div>
    </>)
}