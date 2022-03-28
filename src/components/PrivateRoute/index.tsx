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
      const user = serversUser.find(item => item.id === currentUser.email)
      const url = !!user && await getUrlAvatar(user.namePic)
      const serversProjects = await getProject()
      const urlTeams = await getUrlAvatarTeams(serversTeam)
      const teams = serversTeam.map((team, index) => {
        const users = team.users.map(user => {
          return {
            id: user.id,
            name: user.name,
            url: urlTeams[index]
          }
        })
        return {
          ...team,
          users: users
        }
      })

      console.log(urlTeams)
      console.log(url);
      state.dispatch({
        action: ACTION.GET_ALL_DATA,
        data: { projects: serversProjects, teams: teams, user: { ...user, url: url } }
      })
    }
    !!currentUser && getUsersFromServer().then()
    // eslint-disable-next-line
  }, [])

  return (
    <Route
      {...rest}
      exact
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }}
    />
  );
};