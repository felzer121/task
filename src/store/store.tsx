import React, { createContext, useReducer, Dispatch } from 'react'
import { TaskType } from '../pages/TasksPage/types'

interface StoreInterface {
  projects: {
    id: string
    name: string
    icon: string
    description: string
    tasks: TaskType[]
  }[]
}
export const INITIAL_STORE: StoreInterface = {
  projects: [{
    id: '',
    name: '',
    icon: '',
    description: '',
    tasks: [],
  }]
}
export enum ACTION {
  GET_PROJECT = 'GET_PROJECT',
  TOGGLE_DONE_TASK = 'TOGGLE_DONE_TASK',
  CREATE_PROJECT = 'CREATE_PROJECT',
  CREATE_TASK = 'CREATE_TASK'
}
interface DispatchInterface {
  action: ACTION
  data: any
}

// создание контекста и задание значений по умолчанию
export const TaskManagerContext = createContext<{
  store: StoreInterface
  dispatch: Dispatch<DispatchInterface>
}>({ store: INITIAL_STORE, dispatch: () => null })

interface TaskManagerProviderProps {
  children: React.ReactChildren | React.ReactChildren[] | React.ReactChild | React.ReactChild[]
}
const reducer = (currentState: StoreInterface, payload: DispatchInterface): StoreInterface => {
  switch (payload.action) {
    case ACTION.GET_PROJECT :
      return {projects: payload.data}
    case ACTION.CREATE_TASK :
      const newTask:any = currentState.projects.map(project => {
        if(project.id === payload.data.id)
          return {...project, tasks: [...project.tasks, payload.data.task]}
        return {...project}
      })
      return {projects: newTask}
    case ACTION.CREATE_PROJECT :
      return {projects: [...currentState.projects, payload.data]}
    // case ACTION.TOGGLE_DONE_TASK:
    //   // const newTasks = currentState.projects.tasks.map(item => {
    //   //   if (item.id === payload.data) {
    //   //     return {...item, isDone: !item.isDone}
    //   //   }
    //   //   return item
    //   // })
    //   return {
    //     projects: {
    //       ...currentState.projects,
    //       tasks: newTasks
    //     }
    //   }
    default:
      return currentState
  }
}

export const TaskManagerProvider = ({ children }: TaskManagerProviderProps) => {
  const [store, dispatch] = useReducer(reducer, INITIAL_STORE)
  return (
    <TaskManagerContext.Provider value={{ store: store, dispatch: dispatch }}>
      {children}
    </TaskManagerContext.Provider>
  )
}
