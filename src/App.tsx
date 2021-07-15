import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { SideBar } from './components/SideBar'
import { MenuItemType } from './components/Menu/types'
import { Header } from './components/Header'
import projectIcon1 from './Pic1.png'
import projectIcon2 from './Pic2.png'
import projectIcon3 from './Pic3.png'
import logo from './logo.svg'
import { Page } from './components/Page'
import { TasksPage } from './pages/TasksPage'
import { TaskType } from './pages/TasksPage/types'
import { FilesPage } from './pages/FilesPage'
import { getTasks } from './services/firebase'
import { KanbanPage } from './pages/KanbanPage'
import { TaskManagerContext, ACTION } from './store/store'


const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/' },
  { title: 'Kanban', url: '/kanban' },
  { title: 'Activity', url: '/activity' },
  { title: 'Calendar', url: '/calendar' },
  { title: 'FilesPage', url: '/files' }
]

const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]

function App() {
  const store = useContext(TaskManagerContext)
  useEffect(() => {
    getTasksFromServer()
  }, [])
  const globalTaskUpdated = (task: TaskType) => {
  }
  const getTasksFromServer = async () => {
    const serversTasks = await getTasks()
    store.dispatch({ action: ACTION.GET_TASKS, data: serversTasks })
  }
  const files = store.store.tasks.map(item => item.files).flat()
  const toDoTasks: TaskType[] = store.store.tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = store.store.tasks.filter(item => item.category === 'backlog')
  return (
    <Router>
      <div className='App'>
        <SideBar />
        <div className='App__page'>
          <Header menu={MAIN_MENU} projectName='Website' projectIcon={logo} users={USERS} />
          <Switch>
            <Route exact path='/'>
              <Page title='tasks'>
                {Boolean(store.store.tasks.length) && (
                  <TasksPage tasks={store.store.tasks} globalTaskUpdated={globalTaskUpdated} />
                )}
              </Page>
            </Route>
            <Route path='/files'>
              <Page title='tasks'>{<FilesPage files={files} />}</Page>
            </Route>
            <Route path='/kanban'>
              <Page title='tasks'>
                {
                  <KanbanPage
                    globalTaskUpdated={globalTaskUpdated}
                    toDoTasks={toDoTasks}
                    backlogTasks={backlogTasks}
                  />
                }
              </Page>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
