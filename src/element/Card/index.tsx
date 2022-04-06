import React from 'react';
import {Button, ButtonProps, styled} from "@mui/material";

const CardButton = styled(Button)<ButtonProps>(({ theme}) => ({
  color: '#131313',
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
  isActive?: boolean
}

const Card = ({children, isActive}: CardProps) => {
  return (
    <CardButton variant="contained" style={isActive ? { backgroundColor: '#FFF8DD', boxShadow: '1px 1px 8px rgba(197, 181, 120, 0.5)'} : {}}>
      {children}
    </CardButton>
  )
}

export default Card;