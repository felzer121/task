import React from 'react'
import { Menu } from '../Menu'
import { MenuItemType } from '../Menu/types'
import './style.scss'

interface HeaderProps {
  users?: string[]
  projectName: string
  projectIcon?: string
  type: string
  id: string
  menu?: MenuItemType[]
}

const Header = ({ menu, projectName, projectIcon, type, id, users = [] }: HeaderProps) => {
  return (
    <div className='Header'>
      <div className='Header__top'>
        <div className='Header__logo'>
          {!!projectIcon && <img src={projectIcon} className='Header__icon' alt='' />}
          <h1 className='Header__title'>{projectName}</h1>
        </div>
        {
          (type === 'dashboard' || 'teams') && <div className='Header__team'>
            {users?.map(user => (
              <img className='Header__teamPerson' src={user} key={user} alt='' />
            ))}
                <button className='Header__share'>share</button>
                <button className='Header__chat'>chat</button>
            </div>
        }
      </div>
      {!!menu && <Menu menu={menu} id={id} type={type} />}
    </div>
  )
}

export { Header }
