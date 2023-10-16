import React, { Children, useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { AccordionStyle, FlexRowSpaceBtw } from '../styles/styles'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

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
  const navigate = useNavigate()
  useEffect(() => {}, [active, list])
  const handleClick = () => {
    navigate(`${page}`)

    setActive(idx)
  }
  return (
    
      <Navbar
        className={` outline ${
          active === idx ? 'active text-white' : 'undefined'
        }`}
        onClick={handleClick}
        style={{width:'100%'}}
      >
        <FlexRowSpaceBtw>

        {/* <span> */}
          <p style={{ fontSize: '1.4rem' }}>
            {title}
            </p>
            <p> {active === idx ? <FaChevronRight /> : <FaChevronUp />}
          </p>
          </FlexRowSpaceBtw>
        {/* </span> */}
      </Navbar>

  )
}

// export default Accordion;
