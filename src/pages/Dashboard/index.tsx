import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { ACTION, TaskManagerContext } from "../../store/store";
import { Project } from "../../components/Project";



export const Dashboard = () => {
  const state = useContext(TaskManagerContext)
  console.log(state);
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