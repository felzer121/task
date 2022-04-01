import React from 'react';
import {Button, ButtonProps, styled} from "@mui/material";
import {purple} from "@mui/material/colors";

const CardBut21ton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  color: '#131313',
  width: '100%',
  padding: '6px 12px',
  border: 'none',
  lineHeight: 1.5,
  backgroundColor: '#F7F6F3',
  borderColor: 'none',
  fontFamily: [
    'Heebo',
    'sans-serif',
    'BlinkMacSystemFont',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: 'none',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
});

const CardButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#131313',
  boxShadow: 'none',
  backgroundColor: '#F7F6F3',
  '&:hover': {
    backgroundColor: '#edeae1',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
}));

interface CardProps {
  children: React.ReactChildren | React.ReactChildren[] | Element | React.ReactNode,
}

const Card = ({children}: CardProps) => {
  return (
    <CardButton variant="contained">
      {children}
    </CardButton>
  );
};

export default Card;