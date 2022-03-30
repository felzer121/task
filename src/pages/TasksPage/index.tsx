import React, {useContext, useEffect, useState} from 'react'
import './style.scss'
import { TaskType } from './types'
import { Task } from '../../components/Task'
import { TaskList } from '../../components/TaskList'
import { ProjectType } from '../../components/SideBarList'
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import {ACTION, TaskManagerContext} from "../../store/store";
import { BoxScroll } from '../../element/BoxScroll'

interface TasksPageProps {
  project: ProjectType
}


const reorder = (list: TaskType[], result: DropResult) => {
  if(result.source.droppableId !== result.destination?.droppableId) {
    return list.map(task => parseInt(task.id) === parseInt(result.draggableId) ? {...task, category: 'todo' } : task)
  }

  const startIndex = list.findIndex(task => parseInt(task.id) === parseInt(result.draggableId))
  const arr = Array.from(list)
  const [removed] = arr.splice(startIndex, 1)
  arr.splice(result.destination.index, 0, removed)
  return arr
};

const TasksPage = ({ project }: TasksPageProps) => {
  const isClose = false
  const state = useContext(TaskManagerContext)
  const [openedTask, setOpenedTask] = useState<TaskType>(project.tasks[0])
  useEffect(() => {
    setOpenedTask(project.tasks[0])
  }, [project])
  let toDoTasks: TaskType[] = project.tasks.filter(item => item.category === 'todo')
  const backlogTasks: TaskType[] = project.tasks.filter(item => item.category === 'backlog')

  const onSelectedTask = (openedTask: TaskType): void => {
    setOpenedTask(openedTask)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    console.log(result);
    const tasks = reorder(
      project.tasks,
      result
    );
    const projects = state.store.projects.map(item => item.id === project.id ? {...project, tasks: tasks} : item)
    state.dispatch({action: ACTION.UPDATE_TASKS, data: projects})
  }

  // const onTaskUpdated = (task: TaskType) => {
  //   setOpenedTask(task)
  // }
  return (
    <div className='TasksPage'>
      <div className='TasksPage__container'>
        <BoxScroll>
          <DragDropContext onDragEnd={onDragEnd}
          >
            <Droppable droppableId="backlog">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TaskList tasks={backlogTasks} project={project} activeTask={openedTask} title='Backlog'
                            onSelectedTask={onSelectedTask}/>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="toDo">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TaskList tasks={toDoTasks} project={project} activeTask={openedTask} title='To Do'
                            onSelectedTask={onSelectedTask}/>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </BoxScroll>
        {Boolean(openedTask) &&
            <Task task={openedTask} onTaskClose={() => {
            }} isClose={isClose}/>}
      </div>
    </div>
  );
}

export { TasksPage }
