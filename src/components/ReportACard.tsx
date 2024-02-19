import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reportACard } from '../redux/CardReducer'
import { IrootState } from '../redux/store'
import { button } from '../styles/styles'
export function ReportACard() {
  const dispatch = useDispatch()
  const rootState = useSelector((state) => state as IrootState)
  const { Cards } = rootState
  const [report, setReport] = useState({ lasrraId: '', comment: '' })
  console.log(report.lasrraId, 'report from report a card')
  const { cards, batchDetail, reports } = Cards
  const onsubmit = () => {
    const newCards = cards.filter((c) => c.lasrraId !== report.lasrraId)
    const cardsWithIssue = cards.find((c) => c.lasrraId === report.lasrraId)
    if (cardsWithIssue) {
      dispatch(
        reportACard({
          batchDetail,
          cards: newCards,
          reports: [...reports, { ...cardsWithIssue, ...report }],
        })
      )
    }

    setReport({ lasrraId: '', comment: '' })
  }
  return (
    <>
      <div className='flex m-2 border-2'>
        <label className={button}>LassraId:</label>
        <input
          type="text"
          value={report.lasrraId}
          onChange={(e) =>
            setReport((report) => ({ ...report, lasrraId: e.target.value.trim() }))
          }
          className='text-gray-500 w-[80%] h-[3rem] flex-1'
        />
      </div>
      <div className='flex m-2 border-2'>
        <label className={button}>Reason:</label>
        <textarea
          value={report.comment}
          onChange={(e) =>
            setReport((report) => ({ ...report, status: 1, comment: e.target.value }))
          }
          className='text-gray-500 h-[6rem] w-full'
        />
      </div>
      <button onClick={onsubmit} className={button + ' m-2'} >Add</button>
    </>
  )
}
