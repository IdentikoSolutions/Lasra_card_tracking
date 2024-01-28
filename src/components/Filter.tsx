import React, { useState, useEffect, useCallback } from 'react'
import { IFilterProp } from '../interface/interface'
import { Input } from '../styles/styles'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import { FaChevronRight } from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FloatingLabel } from 'react-bootstrap'

// const FilterInput = styled(Input)`
//   border-radius: 0;
//   margin: 5px;
//   max-width: 80px;
//   box-shadow: 3px 5px;
// `

export const Filter: React.FC<IFilterProp> = ({ state, setState }) => {
  const searchoption = ["batchid", "cardid", "comment", "surname", "firstname", "lastname", "middlename", "lasrraid", "lga"]
  const [selection,setSelection]= useState<string[]>([])
  const [open,setOpen]=useState(false)
  
  const handleOption =useCallback((item) => {
    const isPresent = selection.indexOf(item)
    if (isPresent >= 0) {
      setSelection(selection=>selection.filter(type =>type!==item))
      // useEffect(()=>{

      // })
    } else {
      setSelection(selection=>[...selection,item])
    }
  },[selection])
  useEffect(() => {
    console.log( selection,open, 'useeffect', selection.includes('batchid'))

  },[handleOption, selection,open])
  return (
    <>

      <div className='flex'>
        <div className={`w-fit ${ open ? 'h-40 overflow-y-scroll relative top-50 z-100 opacity-100 ':'overflow-hidden h-6'} m-1  rounded-md border-3`} onClick={()=> setOpen(!open)}>
          {!open && <p>add filter<FaChevronRight className='rotate-90 m-1 inline'/></p>}
          {
            searchoption.map((item, idx) => (<div onClick={() => handleOption(item)} key={idx}><p className='bg-blue-200 hover:bg-blue-50 m-0 border-1' >{item}</p></div>))
          }
        </div>
        {/* <InputGroup className="mb-3"> */}
        <FloatingLabel
          controlId="batchId"
          label="BatchId"
          className={`${selection.includes('batchid')?'':'hidden'}`}
        >
          <Form.Control aria-label="batchid"
            type="number"
            placeholder="BatchID"

            value={state.batchId === 0 ? '' : state.batchId}
            onChange={(e) => setState(state, 'batchId', e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="cardId"
          label="CardId"
        // className="mb-3"
        className={`${selection.includes('cardid')?'':'hidden'}`}

        >
          <Form.Control aria-label="cardid"
            type="number"
            placeholder="cardId"

            value={state.cardId === 0 ? '' : state.cardId}
            onChange={(e) => setState(state, 'cardId', e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="comment"
          label="comment"
          className={`${selection.includes('comment')?'':'hidden'}`}
        >
          <Form.Control aria-label="comment"
            type="text"
            placeholder="comment"

            value={state.comment}
            onChange={(e) => setState(state, 'comment', e.target.value)}
          />
        </FloatingLabel>{' '}
        <FloatingLabel
          controlId="surname"
          label="surname"
          className={`${selection.includes('surname')?'':'hidden'}`}
        >
          <Form.Control aria-label="surname" type="text"
            placeholder="surname"

            value={state.surname}
            onChange={(e) => setState(state, 'surname', e.target.value)}
          />
        </FloatingLabel>{' '}
        <FloatingLabel
          controlId="firstname"
          label="firstname"
          className={`${selection.includes('firstname')?'':'hidden'}`}
        >
          <Form.Control aria-label="firstname" type="text"
            value={state.firstname}
            placeholder="firstname"

            onChange={(e) => setState(state, 'firstname', e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="middlename"
          label="middlename"
          className={`${selection.includes('middlename')?'':'hidden'}`}
        >
          <Form.Control aria-label="middlename" type="text"
            placeholder="middlename"
            value={state.middlename}
            onChange={(e) => setState(state, 'middlename', e.target.value)}
          />
        </FloatingLabel>{' '}
        <FloatingLabel
          controlId="lasrraid"
          label="lasrraid"
          className={`${selection.includes('lasrrraid')?'':'hidden'}`}
        >
          <Form.Control aria-label="lasrraid" type="text"
            value={state.lasrraid}
            placeholder="lasrraId"

            onChange={(e) => setState(state, 'lasrraid', e.target.value)}
          />
        </FloatingLabel>{' '}
        <FloatingLabel
          controlId="lga"
          label="lga"
          className={`${selection.includes('lga')?'':'hidden'}`}
        >
          <Form.Control aria-label="lga" type="text"
            value={state.lga}
            placeholder="lga"

            onChange={(e) => setState(state, 'lga', e.target.value)}
          />
        </FloatingLabel>
      </div>
    </>

  )
}
