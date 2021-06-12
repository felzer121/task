import React from 'react'
import { Menu } from '../Menu'
import { MenuItemType } from '../Menu/types'
import './style.scss'

interface HeaderProps {
  users?: string[]
  projectName: string
  projectIcon: string
  menu: MenuItemType[]
}

const Header = ({ menu, projectName, projectIcon, users = [] }: HeaderProps) => {
  return (
    <div className='Header'>
      <div className='Header__top'>
        <div className='Header__logo'>
          <img src={projectIcon} alt='' />
          <h1 className='Header__title'>{projectName}</h1>
        </div>
        <div className='Header__team'>
          {users?.map(user => (
            <img className='Header__teamPerson' src={user} key={user} alt='' />
          ))}
          <button className='Header__share'>share</button>
          <button className='Header__chat'>chat</button>
        </div>
      </div>

      <Menu menu={menu} />
    </div>
  )
}

export { Header }
