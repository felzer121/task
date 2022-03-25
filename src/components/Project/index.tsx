import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { TasksPage } from "../../pages/TasksPage";
import { TaskManagerContext } from "../../store/store";
import { Page } from "../Page";
import { ProjectType } from '../SideBarList'
import { TaskType } from "../../pages/TasksPage/types";
import { Header } from "../Header";
import projectIcon1 from '../../Pic1.png'
import projectIcon2 from '../../Pic2.png'
import projectIcon3 from '../../Pic3.png'

import { MenuItemType } from "../Menu/types";
import logo from '../../logo.svg'
import { KanbanPage } from "../../pages/KanbanPage";
import { FilesPage } from "../../pages/FilesPage";
import { CalendarPage } from "../../pages/CalendarPage";
const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/' },
  { title: 'Kanban', url: '/kanban/' },
  { title: 'Activity', url: '/activity/' },
  { title: 'Calendar', url: '/calendar/' },
  { title: 'FilesPage', url: '/files/' }
]
const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]

export const Project = () => {
  const state = useContext(TaskManagerContext)
  let { id } = useParams<{id: string}>();
  const [project, setProject] = useState<ProjectType>({
    id: '',
    name: '',
    icon: '',
    description: '',
    tasks: [],
  })

  useEffect(() => {
    if (state.store.projects.length > 1) {
      setProject(state.store.projects.find(project => project.id === id)!)
    }
  }, [state, id])

  const files = project.tasks.map(item => item.files).flat()
  const toDoTasks: TaskType[] = project.tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = project.tasks.filter(item => item.category === 'backlog')

  return (
    <>
      <Header menu={MAIN_MENU} projectName={project.name} id={id} type={'dashboard'} projectIcon={logo} users={USERS} />
      <Switch>
        <Route exact path="/dashboard/:id">
          <Page title="home">
            {Boolean(project.tasks) && (
              <TasksPage project={project} />
            )}
          </Page>
        </Route>
        <Route exact path="/dashboard/:id/kanban">
          <Page title="tasks">
            {
              <KanbanPage
                project={project}
                toDoTasks={toDoTasks}
                backlogTasks={backlogTasks}
              />
            }
          </Page>
        </Route>
        <Route path="/dashboard/:id/calendar/">
          <Page title="tasks">{<CalendarPage project={project} />}</Page>
        </Route>
        <Route path="/dashboard/:id/files/">
          <Page title="tasks">{<FilesPage files={files} />}</Page>
        </Route>
      </Switch>
    </>
  );
};