import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IrootState } from '../redux/store'
import { FiChevronsRight, FiChevronsLeft } from 'react-icons/fi'

export const Aside = () => {
  const [isAsideOpen, toggleAsideOpen] = useState(false)
  const { cards, batchDetail, reports } = useSelector(
    (state) => state as IrootState,
  ).Cards
  return (
    <div
      className={`${
        isAsideOpen ? ' w-[200px] -translate-x-0' : '  w-[25px] rounded-full'
      } absolute  right-0 top-[50px] h-[100%] mx-0 pt-5`}
    >
      {isAsideOpen && (
        <div className="h-[150vh] border border-l-2 absolute left-[-50px] top-[-68px] z-[9999]"></div>
      )}
      <button
        onClick={() => toggleAsideOpen(!isAsideOpen)}
        className="text-[3rem] absolute left-[-50px] text-gray-400"
      >
        {!isAsideOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
      </button>
      {isAsideOpen && (
        <>
          <h3 className="text-green-600 text-center text-xxl font-extrabold ">
            Status
          </h3>
          <p className="text-green-600 text-center text-[1rem]">PRODUCED</p>
          <p className="text-green-600 text-center text-[1rem] font-extrabold">
            (P)
          </p>
          <p className="text-red-600 text-center text-[1rem]">NOT PRODUCED</p>
          <p className="text-red-600 text-center text-[1rem] font-extrabold">
            (NP)
          </p>
          <h3 className="text-red-600 text-center font-bold mt-[50px]">NP</h3>
          <p className="text-red-600 text-center font-bold">Lasrra IDs</p>
          {reports.map((item) => (
            <p
              className="text-red-600 text-center text-[1rem]"
              key={item.lasrraId}
            >
              {item.lasrraId.substring(0, 5) + '*****'}
            </p>
          ))}

          <h3 className="text-green-600 text-center text-[1rem]">
            TOTAL PPRODUCED
          </h3>
          <p className="text-green-600 text-center text-[1rem]">
            ({cards.length})
          </p>
          <h3 className="text-red-600 text-center text-[1rem]">
            TOTAL NOT-PRODUCED
          </h3>
          <p className="text-red-600 text-center text-[1rem]">
            ({reports.length})
          </p>
        </>
      )}
    </div>
  )
}
