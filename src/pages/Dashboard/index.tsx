import React, {useContext} from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import logo from "../../logo.svg";
import {Header} from "../../components/Header";
import {TaskManagerContext} from "../../store/store";
import {ProjectType} from "../../components/SideBarList";

import { Outlet } from "react-router-dom";
import {MenuItemType} from "../../components/Menu/types";
import projectIcon1 from "../../Pic1.png";
import projectIcon2 from "../../Pic2.png";
import projectIcon3 from "../../Pic3.png";
import Loader from "../../components/Loader/Loader";

const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/task-page/' },
  { title: 'Kanban', url: '/kanban/' },
  { title: 'Activity', url: '/activity/' },
  { title: 'Calendar', url: '/calendar/' },
  { title: 'FilesPage', url: '/files/' }
]
const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]
export const Dashboard = () => {
  const state = useContext(TaskManagerContext)
  let { id } = useParams<{id: string}>();
  const [project, setProject] = React.useState<ProjectType>()

  !id ? id = state.store.projects[0].id : id

  React.useEffect(() => {
    id && setProject(state.store.projects.find(project => project.id === id))
  },[state, id])

  if(!project)
    return <Loader />

  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Header menu={MAIN_MENU} projectName={project.name} id={id} type={'dashboard'} projectIcon={logo} users={USERS} />
        <Outlet context={project} />
      </div>
    </div>
  );
};