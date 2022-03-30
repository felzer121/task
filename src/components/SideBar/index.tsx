import React, {useContext} from 'react'
import logo from './Logo.svg'
import search from './Search.svg'
import './style.scss'
import { SideBarList, SideBarListItem } from '../SideBarList'
import { Profile } from '../Profile'
import {TaskManagerContext} from "../../store/store";

const menuList: SideBarListItem[] = [
  { title: 'Home' },
  { title: 'My TasksPage' },
  { title: 'Notifications', count: 3 }
]

function SideBar() {
  const state = useContext(TaskManagerContext)

  return (
    <div className='SideBar'>
      <div className='SideBar__logo'>
        <a href='/' className='SideBar__logoLink'>
          <img src={logo} alt='' />
          <span className='SideBar__logoHeader'>PROJECTUS</span>
        </a>
        <img src={search} alt='' />
      </div>

      <Profile avatarUrl={state.store.user.url} fullName={state.store.user.name} position={state.store.user.role} />

      <SideBarList isMenu={true} list={menuList} title={'Menu'} />
      <SideBarList isProject={true} title={'Projects'} />
      <SideBarList isTeams={true} title={'Teams'} />
    </div>
  )
}

export {SideBar};

