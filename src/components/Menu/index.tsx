import React from 'react'
import { MenuItemType } from './types'
import { NavLink } from 'react-router-dom'
import './style.scss'

interface MenuProps {
  menu: MenuItemType[]
  id: string
}

const Menu = ({ menu, id }: MenuProps) => {
  return (
    <menu className='Menu'>
      <ul className='Menu__wrapper'>
        {menu.map(item => {
          return (
            <li key={item.url}>
              <NavLink
                exact
                className='Menu__link'
                activeClassName='Menu__link_selected'
                to={`/dashboard/${id}${item.url}`}>
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
