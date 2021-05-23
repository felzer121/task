import React from 'react'
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
import { TaskType, ToDoType } from './pages/TasksPage/types'

const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/' },
  { title: 'Kanban', url: '/kanban' },
  { title: 'Activity', url: '/activity' },
  { title: 'Calendar', url: '/calendar' },
  { title: 'FilesPage', url: '/files' }
]
const TASKS: TaskType[] = [
  {
    title: 'Find top 5 customer requests',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Marketing',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.'
  },
  {
    title: 'E-mail after registration so that I can confirm my address',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Developement',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.'
  },
  {
    title: 'Two-factor authentication to make my private data more secure ',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Design',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.'
  }
]
const TODO: ToDoType[] = [
  {
    title: 'An option to search in current projects or in all projects',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Marketing',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.'
  },
  {
    title: 'An option to search in current projects or in all projects',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Marketing',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.'
  }
]
const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]

function App() {
  return (
    <Router>
      <div className='App'>
        <SideBar />
        <div className='App__page'>
          <Header menu={MAIN_MENU} projectName='Website' projectIcon={logo} users={USERS} />
          <Switch>
            <Route exact path='/'>
              <Page title='tasks'>
                <TasksPage tasks={TASKS} toDo={TODO} />
              </Page>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
