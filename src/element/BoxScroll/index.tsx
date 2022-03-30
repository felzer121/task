import React from 'react'
import './style.scss'

interface BoxScrollProps {
  children: React.ReactChild | React.ReactChild[]
}

export const BoxScroll = ({children}: BoxScrollProps) => {
  return (
    <div className='boxScroll'>
      {children}
    </div>
  )
}