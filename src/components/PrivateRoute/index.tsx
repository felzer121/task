import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../store/auth";
import {getProject, getTeams, getUrlAvatar, getUsers} from "../../services/firebase";
import {ACTION, TaskManagerContext} from "../../store/store";

export const PrivateRoute = ({ component: Component, ...rest }:any) => {
  const { currentUser }:any = useAuth()
  const state = useContext(TaskManagerContext)
  React.useEffect(() => {
    const getUsersFromServer = async () => {
      const serversUser = await getUsers()
      const serversTeam = await getTeams()
      const user = serversUser.find(item => item.id === currentUser.email)
      const url = !!user && await getUrlAvatar(user.namePic)
      const serversProjects = await getProject()

      state.dispatch({ action: ACTION.GET_ALL_DATA, data: {projects: serversProjects, teams: serversTeam, user: {...user, url: url}} })
    }
    getUsersFromServer().then()
  }, [])

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }}
    />
  );
};