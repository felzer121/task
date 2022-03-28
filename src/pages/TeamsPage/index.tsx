import React from 'react'
import {SideBar} from "../../components/SideBar";
import {Route, Switch} from "react-router-dom";
import {TeamsList} from "../../components/TeamsList";

const TeamsPage = () => {
  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Switch>
          <Route path='/teams/:id' component={TeamsList} />
        </Switch>
      </div>
    </div>
  )
}

export { TeamsPage }