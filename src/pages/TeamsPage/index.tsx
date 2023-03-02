import React from 'react'
import {SideBar} from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const TeamsPage = () => {
  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Outlet />
      </div>
    </div>
  )
}

export { TeamsPage }