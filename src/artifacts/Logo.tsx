import React from 'react'
// import lasralogo from '../assests/images/lasralogo.png'
import lasralogo from '../assets/images/lasralogo.png'
import { Link } from 'react-router-dom'
import { LogoWrapper } from '../styles/styles'
import styled from 'styled-components'
export interface Ilogowrapper {
    width: string,
    height: string,
    src:string
    // Other prop definitions
  }
  export const LogoBox=styled(LogoWrapper)<Ilogowrapper>`
  `

function Logo() {
  return (
    <>
      <Link to={'/'}>
        <LogoBox
          width={'300px'}
          height={'100px'}
          src={lasralogo}
        />

        {/* </LogoWrapper> */}
      </Link>
    </>
  )
}

export default Logo
