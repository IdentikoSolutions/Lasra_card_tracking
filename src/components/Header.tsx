import React from 'react'
import Logo from '../artifacts/Logo'
import { useApp } from './context/AppContext'

export function Header() {
  const { pageName } = useApp() as any
  return (
    <div className="transparent w-[100vw] flex justify-between  h-fit p-[0.2rem] shadow-sm">
      <Logo />
      <div className="flex justify-between  flex-1 ">
        <p className="  text-[3rem] self-start text-green-700 px-10 ">
          {pageName}
        </p>
        <div>icon</div>
      </div>
    </div>
  )
}
