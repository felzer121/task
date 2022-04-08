import React from 'react'
import { MenuItemType } from './types'
import { NavLink } from 'react-router-dom'
import './style.scss'

interface MenuProps {
  menu: MenuItemType[]
  type: string
  id: string
}

const Menu = ({ menu, type, id }: MenuProps) => {
  return (
    <menu className='Menu'>
      <ul className='Menu__wrapper'>
        {menu.map(item => {
          return (
            <li key={item.url}>
              <NavLink
                className='Menu__link'
                // activeClassName='Menu__link_selected'
                to={type === 'dashboard' ? `/dashboard/${id}${item.url}` : item.url}>
                {item.title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </menu>
  )
}

export { Menu }
