import React from "react";
import { Route, Switch } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { Project } from "../../components/Project";



export const Dashboard = () => {
  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Switch>
          <Route path='/dashboard/:id' component={Project} />
        </Switch>
      </div>
    </div>
  );
};