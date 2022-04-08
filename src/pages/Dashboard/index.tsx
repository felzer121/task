import React, {useContext, useEffect, useState} from "react";
import {Route, Routes, useParams} from "react-router-dom";
import { SideBar } from "../../components/SideBar";
import { Project } from "../../components/Project";
import logo from "../../logo.svg";
import {Header} from "../../components/Header";
import {TaskManagerContext} from "../../store/store";
import {ProjectType} from "../../components/SideBarList";
import {TaskType} from "../TasksPage/types";
import {MenuItemType} from "../../components/Menu/types";
import projectIcon1 from "../../Pic1.png";
import projectIcon2 from "../../Pic2.png";
import projectIcon3 from "../../Pic3.png";

const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/' },
  { title: 'Kanban', url: '/kanban/' },
  { title: 'Activity', url: '/activity/' },
  { title: 'Calendar', url: '/calendar/' },
  { title: 'FilesPage', url: '/files/' }
]
const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]
export const Dashboard = () => {

  const state = useContext(TaskManagerContext)
  let { id } = useParams<{id: string}>();
  const [name, setName] = React.useState<ProjectType>()
  console.log(id)
  if(!id)
    return <div>q</div>

  React.useEffect(() => {
    console.log(state.store.projects.find(project => project.id === id));
    setName(state.store.projects.find(project => project.id === id))
  },[state, id])

  if(!name)
    return <div>q</div>

  return (
    <div className='App'>
      <SideBar />
      <div className='App__page'>
        <Header menu={MAIN_MENU} projectName={name.name} id={id} type={'dashboard'} projectIcon={logo} users={USERS} />
      </div>
    </div>
  );
};