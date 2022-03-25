import React, {useContext} from 'react'
import logo from './Logo.svg'
import teamImg1 from './team1.png'
import teamImg2 from './team2.png'
import teamImg3 from './team3.png'
import teamImg4 from './team4.png'
import teamImg5 from './team5.png'
import teamImg6 from './team6.png'
import teamImg7 from './team7.png'
import teamImg8 from './team8.png'
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

const projectTeams: SideBarListItem[] = [
  { title: 'Designers', users: [teamImg1, teamImg2, teamImg3] },
  { title: 'Backend', users: [teamImg4, teamImg5] },
  { title: 'Frontend', users: [teamImg6, teamImg7, teamImg8] }
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

      <SideBarList list={menuList} title={'Menu'} />
      <SideBarList isProject={true} title={'Projects'} />
      <SideBarList list={projectTeams} title={'Teams'} />
    </div>
  )
}

export {SideBar};

