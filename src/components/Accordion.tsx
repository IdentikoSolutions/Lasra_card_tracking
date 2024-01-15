import React, { Children, useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
// import { AccordionStyle, FlexRowSpaceBtw } from '../styles/styles'
import { useNavigate } from 'react-router-dom'
// import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useApp } from './context/AppContext'
import { useDispatch } from 'react-redux'
import { reset } from '../redux/CardReducer'

interface Iaccordion {
  title?: string
  list?: string | string[]
  children?: any
  className?: string | undefined
  page?: string
  active: number
  setActive: (num: number) => void
  idx: number
}

export const Accordion: React.FC<Iaccordion> = ({
  title,
  list,
  active,
  setActive,
  idx,
  page,
  children,
}) => {
  const {setPageName} = useApp() as any
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {}, [active, list])
  const handleClick = () => {
  setPageName(title)
dispatch(reset({}))
    navigate(`${page}`)

    setActive(idx)
  }
  return (
      <Navbar
        className={`  ${
          active === idx ? 'active text-black bg-green-100 ' : 'undefined text-white bg-transparent'
        }  px-3 items-center flex-1 flex my-3 shadow-sm justify-between`}
        onClick={handleClick}
        style={{width:'100%'}}
      >
          <div className='text-[1.4rem]flex-1 stretch'>
            {title}
            </div>
            <div className='text-[2rem] text-bold border-none absolute right-0 rotate-45  p-1'> {active === idx ? <FaChevronUp  className='rotate-45'/> : <FaChevronRight className='rotate-45'/>}
          </div>
      </Navbar>

  )
}

