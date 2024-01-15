import React, { useState } from 'react'
import { ButtonElement } from './ButtonElement'
import { ReportStyle } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux'
import  {reportACard } from '../redux/CardReducer'
import { IrootState } from '../redux/store'
export function ReportACard() {
  const dispatch = useDispatch()
  const rootState = useSelector((state) => state as IrootState)
  const { Cards } = rootState
  const [report, setReport] = useState({ lasrraId: '', comment: '' })
  console.log(report.lasrraId,'report from report a card')
  const { cards, batchDetail, reports } = Cards
  const onsubmit = () => {
    // e.preventDefault();
    const newCards = cards.filter((c) => c.lasrraId !== report.lasrraId)
    const cardsWithIssue = cards.find((c) => c.lasrraId === report.lasrraId)
    if(cardsWithIssue){
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
      <ReportStyle>
        <label>LassraId:</label>
        <input
          type="text"
          value={report.lasrraId}
          onChange={(e) =>
            setReport((report) => ({ ...report, lasrraId: e.target.value.trim() }))
          }
          className="text"
        />
      </ReportStyle>
      <ReportStyle>
        <label>Reason:</label>
        <textarea
          value={report.comment}
          onChange={(e) =>
            setReport((report) => ({ ...report, status:1,comment: e.target.value }))
          }
          className="textarea"
        />
      </ReportStyle>
      <ButtonElement label={'Add'} onClick={onsubmit} className="button" />
    </>
  )
}
