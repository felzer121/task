import React from 'react';
import './style.scss'

import more from './More.svg'
import {IconButton, MenuItem, Menu} from "@mui/material";
import { NavLink } from "react-router-dom";
import { logOut } from '../../services/user'

interface ProfileProps {
    avatarUrl: string,
    fullName: string,
    position: string
}

function Profile({ avatarUrl, fullName, position }: ProfileProps) {
  const [open, setOpen] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }
  return (
    <div className="profile">
      <div className="profile__container">
        <img src={avatarUrl} className="profile__avatarUrl" alt=""/>
        <div>
          <h3 className="profile__fullName">{fullName}</h3>
          <span className="profile__position">{position}</span>
        </div>
      </div>
      <IconButton aria-label="Example" onClick={handleMenu} style={{height: '30px'}}>
        <img src={more} alt=""/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <NavLink to={'/profile/settings'} style={{textDecoration: 'none', color: '#000'}}>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
        </NavLink>
        <div onClick={logOut}>
          <MenuItem onClick={handleClose}>Exit</MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export { Profile };