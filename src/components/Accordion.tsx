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
  icon:any
}

export const Accordion: React.FC<Iaccordion> = ({
  title,
  list,
  active,
  setActive,
  idx,
  page,
  icon,
  children,
}) => {
  const { setPageName } = useApp() as any
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => { }, [active, list])
  const handleClick = () => {
    setPageName(title)
    dispatch(reset({}))
    navigate(`${page}`)

    setActive(idx)
  }
  return (
    <Navbar
      className={`  ${active === idx ? 'active bg-green-100  ' : 'undefined bg-transparent'
        }  px-10 m-0  items-center flex-1 flex py-10  border-b justify-between text-gray-600 `}
      onClick={handleClick}
      style={{ width: '100%',height:'80px' }}
    >
       <div className='text-[1.4rem] text-bold border-none relative lg:p-3 '> 
{icon}
       {/* {active === idx ? <FaChevronUp className='rotate-45' /> : <FaChevronRight className='rotate-45' />} */}
      </div>
      <div className='text-[1.1rem] flex-1 stretch hidden md:inline'>
        {title}
      </div>
     
    </Navbar>

  )
}

