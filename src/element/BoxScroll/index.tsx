import React from 'react'
import './style.scss'

interface BoxScrollProps {
  style: object
  children: React.ReactNode
}

export const BoxScroll = ({style, children}: BoxScrollProps) => {
  return (
    <div className='boxScroll' style={style}>
      {children}
    </div>
  )
}