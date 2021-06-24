import React, { useEffect, useState } from 'react'
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
import { getTasks }  from './services/firebase'

const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/' },
  { title: 'Kanban', url: '/kanban' },
  { title: 'Activity', url: '/activity' },
  { title: 'Calendar', url: '/calendar' },
  { title: 'FilesPage', url: '/files' }
]

const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  useEffect(()=> {getTasksFromServer()},[])
  const globalTaskUpdated = (task: TaskType) => {
    tasks[task.id - 1] = task
  }
  const getTasksFromServer = async ()=> {
    const serversTasks = await getTasks()
    setTasks(serversTasks)
  }
  const files = tasks.map(item => item.files).flat()

  return (
    <Router>
      <div className='App'>
        <SideBar />
        <div className='App__page'>
          <Header menu={MAIN_MENU} projectName='Website' projectIcon={logo} users={USERS} />
          <Switch>
            <Route exact path='/'>
              <Page title='tasks'>
                {Boolean(tasks.length) &&
                <TasksPage
                  tasks={tasks}
                  globalTaskUpdated={globalTaskUpdated}
                />}

              </Page>
            </Route>
            <Route path='/files'>
              <Page title='tasks'>{<FilesPage files={files} />}</Page>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
