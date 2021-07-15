import React, { createContext, useReducer, Dispatch } from 'react'
import { TaskType } from '../pages/TasksPage/types'

interface StoreInterface {
  tasks: TaskType[]
}
const INITIAL_STORE: StoreInterface = {
  tasks: []
}
export enum ACTION {
  GET_TASKS = 'GET_TASKS',
  TOGGLE_DONE_TASK = 'TOGGLE_DONE_TASK'
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
    case ACTION.GET_TASKS:
      return {tasks: payload.data}
    case ACTION.TOGGLE_DONE_TASK:
      const newTasks = currentState.tasks.map(item => {
        if (item.id === payload.data) {
          return {...item, isDone: !item.isDone}
        }
        return item
      })
      return {tasks: newTasks}
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
