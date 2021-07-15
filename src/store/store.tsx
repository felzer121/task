import React, { createContext, useReducer, Dispatch } from 'react'
import { TaskType } from '../pages/TasksPage/types'

interface StoreInterface {
  tasks: TaskType[]
}
const INITIAL_STORE: StoreInterface = {
  tasks: []
}

// создание контекста и задание значений по умолчанию
export const TaskManagerContext = createContext<{
  store: StoreInterface
  dispatch: Dispatch<{ action: any; data: any }>
}>({ store: INITIAL_STORE, dispatch: () => null })

interface TaskManagerProviderProps {
  children: React.ReactChildren | React.ReactChildren[] | React.ReactChild | React.ReactChild[]
}
const reducer = (currentState: StoreInterface, payload: any): StoreInterface => {
  if (payload.action === 'GET_TASKS') {
    return { tasks: payload.data }
  }
  if (payload.action === 'TOGGLE_DONE_TASK') {
    const newTasks = currentState.tasks.map(item => {
      if(item.id === payload.data) {
        return { ...item, isDone: !item.isDone }
      }
      return item
    })
    return { tasks: newTasks}
  }
  return { tasks: [] }
}

export const TaskManagerProvider = ({ children }: TaskManagerProviderProps) => {
  const [store, dispatch] = useReducer(reducer, INITIAL_STORE)
  return (
    <TaskManagerContext.Provider value={{ store: store, dispatch: dispatch }}>
      {children}
    </TaskManagerContext.Provider>
  )
}
