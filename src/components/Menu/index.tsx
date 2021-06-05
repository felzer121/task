import React from 'react'
import { MenuItemType } from './types'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import './style.scss'

interface MenuProps {
  menu: MenuItemType[]
}

const Menu = ({ menu }: MenuProps) => {
  return (
    <menu className='Menu'>
      <ul className='Menu__list'>
        {menu.map(item => {
          return (
            <li className='Menu__route'>
              <NavLink exact activeClassName='selected' className='Menu__link' to={item.url}>
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
