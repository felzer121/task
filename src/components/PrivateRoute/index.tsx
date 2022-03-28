import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { getProject, getTeams, getUrlAvatar, getUrlAvatarTeams, getUsers } from '../../services/firebase'
import {ACTION, TaskManagerContext} from "../../store/store";

export const PrivateRoute = ({ component: Component, ...rest }:any) => {
  const { currentUser }:any = useAuth()
  const state = useContext(TaskManagerContext)
  React.useEffect(() => {
    const getUsersFromServer = async () => {
      const serversUser = await getUsers()
      const serversTeam = await getTeams()
      const teams = serversTeam.map(team => team.users.map(async user => user.namePic))
      const user = serversUser.find(item => item.id === currentUser.email)
      const url = !!user && await getUrlAvatar(user.namePic)
      const serversProjects = await getProject()
      const asas = await getUrlAvatarTeams(teams)
      console.log(asas)
      state.dispatch({
        action: ACTION.GET_ALL_DATA,
        data: { projects: serversProjects, teams: serversTeam, user: { ...user, url: url } }
      })
    }
    !!currentUser && getUsersFromServer().then()
    // eslint-disable-next-line
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