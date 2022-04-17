import React from 'react';
import {Button, ButtonProps, styled} from "@mui/material";
import {TaskType} from "../../pages/TasksPage/types";

const CardButton = styled(Button)<ButtonProps>(({ theme}) => ({
  color: '#131313',
  width: '100%',
  boxShadow: 'none',
  backgroundColor: '#F7F6F3',
  '&:hover': {
    backgroundColor: '#edeae1',
    boxShadow: 'none',
  },
  '&:not(:last-child)': {
    marginBottom: '15px'
  },
  '&:active': {
    backgroundColor: '#FFF8DD',
    borderColor: '#005cbf',
  },
}))

interface CardProps {
  children: React.ReactChildren | React.ReactChildren[] | Element | React.ReactNode,
  onSelectedTask?: (task: TaskType) => void
  isActive?: boolean
  task?: TaskType
  type: string
}

const Card = ({children, onSelectedTask, isActive, task, type}: CardProps) => {
  let style

  const handleClick = () => {
    if(onSelectedTask && task)
      onSelectedTask(task)
  }

  if(type === 'task')
    style = {padding: '20px 25px 20px 60px'}
  else if(type === 'card')
    style = isActive ? { backgroundColor: '#FFF8DD', boxShadow: '1px 1px 8px rgba(197, 181, 120, 0.5)'} : {}
  return (
    <CardButton variant="contained" style={style} onClick={handleClick}>
      {children}
    </CardButton>
  )
}

export default Card;