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
import { TaskType } from './pages/TasksPage/types'
import { FilesPage } from './pages/FilesPage'

const MAIN_MENU: MenuItemType[] = [
  { title: 'TasksPage', url: '/' },
  { title: 'Kanban', url: '/kanban' },
  { title: 'Activity', url: '/activity' },
  { title: 'Calendar', url: '/calendar' },
  { title: 'FilesPage', url: '/files' }
]
const TASKS: TaskType[] = [
  {
    id: 1,
    title: 'Find top 5 customer requests',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Marketing',
    category: 'backlog',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.',
    files: [
      {
        id: 1,
        icon: 'image/pdf.svg',
        name: 'Redesign Brief 2019.pdf',
        size: 159,
        author: 'Mattie Blooman',
        tag: 'Marketing',
        date: 1620837011
      },
      {
        id: 6,
        icon: 'image/pdf.svg',
        name: 'FFF',
        size: 159,
        author: 'Mattie Blooman',
        tag: 'Marketing',
        date: 1620837011
      }
    ]
  },
  {
    id: 2,
    title: 'E-mail after registration so that I can confirm my address',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    category: 'backlog',
    tag: 'Developement',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.',
    files: [
      {
        id: 2,
        icon: 'image/zip.svg',
        name: 'All Files.zip',
        size: 17,
        author: 'Alfie Wood',
        tag: 'Marketing',
        date: 1620837011
      }
    ]
  },
  {
    id: 3,
    title: 'Two-factor authentication to make my private data more secure ',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    category: 'backlog',
    dueOn: 'Tue, Dec 25',
    tag: 'Design',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.',
    files: [
      {
        id: 3,
        icon: 'image/base1.png',
        name: 'Header Photo.jpg',
        size: 5159,
        author: 'Chinmay Sarasvati',
        tag: 'Design',
        date: 1620837011
      }
    ]
  },
  {
    id: 4,
    title: 'An option to search in current projects or in all projects',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    category: 'todo',
    tag: 'Marketing',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.',
    files: [
      {
        id: 4,
        icon: 'image/base2.png',
        name: 'Article Image.jpg',
        size: 432,
        author: 'Homayoun Shakibaii',
        tag: 'Developement',
        date: 1620837011
      }
    ]
  },
  {
    id: 5,
    title: 'An option to search in current projects or in all projects',
    author: 'Added by Kristin A.',
    createdAt: 1620837011,
    assignTo: 'Linzell Bowman',
    dueOn: 'Tue, Dec 25',
    tag: 'Marketing',
    category: 'todo',
    followers: [],
    description:
      'Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.',
    files: [
      {
        id: 5,
        icon: 'image/base3.png',
        name: 'Desing Source.png',
        size: 290,
        author: 'Ingo Schimpff',
        tag: 'Marketing',
        date: 1620837011
      }
    ]
  }
]
const USERS: string[] = [projectIcon1, projectIcon2, projectIcon3]
const Files = TASKS.map(item => item.files).flat()

const globalTaskUpdated = (task: TaskType) => {
  TASKS[task.id - 1] = task
}

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
                <TasksPage tasks={TASKS} globalTaskUpdated={globalTaskUpdated} />
              </Page>
            </Route>
            <Route path='/files'>
              <Page title='tasks'>{<FilesPage files={Files} />}</Page>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
