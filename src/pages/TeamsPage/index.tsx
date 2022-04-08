import React from 'react'
import {SideBar} from "../../components/SideBar";
import { Route, Routes } from 'react-router-dom'
import {TeamsList} from "../../components/TeamsList";

const TeamsPage = () => {
  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Routes>
            <Route path='/teams/:id' >
                <TeamsList/>
            </Route>
        </Routes>
      </div>
    </div>
  )
}

export { TeamsPage }