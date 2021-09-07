import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { getProject } from "../../services/firebase";
import { ACTION, TaskManagerContext } from "../../store/store";
import { Project } from "../../components/Project";



export const Dashboard = () => {
  const state = useContext(TaskManagerContext)
  let history = useHistory();

  useEffect(() => {
    const getProjectFromServer = async () => {
      const serversProjects = await getProject()
      state.dispatch({ action: ACTION.GET_PROJECT, data: serversProjects })
      history.push(`/dashboard/${serversProjects[0].id}`);
    }
    getProjectFromServer()
    // eslint-disable-next-line
  }, []);


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