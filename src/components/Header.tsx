import React from 'react'
import { Div, FlexCol, FlexRow } from '../styles/styles'
import Logo from '../artifacts/Logo'
import { Navlinks } from './Navlinks'
import { Search } from './Search'

export function Header() {
  return (
    <Div>
      <Logo />
      {/* <FlexCol> */}
        <FlexRow>
          <Navlinks to={'/'} name={'Home'} />
          <Navlinks to={'/batches'} name={'Batches'} />
          <Navlinks to={'/relocation'} name={'Relocation Request'} />
          <Navlinks to={'/delivery'} name={'Delivery Request'} />
        </FlexRow>
        {/* <Search/> */}
      {/* </FlexCol> */}
    </Div>
  )
}

