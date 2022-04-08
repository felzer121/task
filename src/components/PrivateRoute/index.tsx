import React, {useContext} from "react";
import { Route, Navigate } from "react-router-dom";
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
        const users = team.users.map((user, indexUser) => {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            open_task: user.open_task,
            url: urlTeams[index][indexUser]
          }
        })
        return {
          ...team,
          users: users
        }
      })

      let users
      for(let i = 0; i < teams.length-1; i++) {
        users = serversUser.map((item, index) => {
          return {...item, url:  urlTeams[i][index]}
        })
      }
      state.dispatch({
        action: ACTION.GET_ALL_DATA,
        data: { projects: serversProjects, teams: teams, user: { ...user, url: url }, users: users }
      })
    }
    !!currentUser && getUsersFromServer().then()
  }, [])
  return (
    <Route
      {...rest}
      render={(props: JSX.IntrinsicAttributes) => {
        return currentUser ? <Component {...props} /> : <Navigate to="/auth" />
      }}
    />
  );
};