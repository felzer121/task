import React, {useContext} from 'react';
import './style.scss'
import {loadAvatar, updateAvatar} from "../../services/firebase";
import {ACTION, TaskManagerContext} from "../../store/store";
import {Autocomplete, TextField} from "@mui/material";

export const ProfileSettings = () => {
  const state = useContext(TaskManagerContext)
  let url: string | ArrayBuffer | null = null
  const loadFile = (e: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = function (e) {
      if(!!e.target)
        url = e.target.result
    }
    loadAvatar(e.target.files[0].name, e.target.files[0]).then((name: string) => {
      state.dispatch({action: ACTION.UPDATE_AVATAR, data: {url: url, name: name }})
      updateAvatar({...state.store.user, namePic: name }).then()
    })
  }
  const userTeams = state.store.user.teams
  const teams = state.store.teams.map(team => team.name)
  return (
    <div className='ProfileSettings'>
      <div className='ProfileSettings__avatar'>
        <img src={state.store.user.url} alt="" className='ProfileSettings__avatar-img' />
        <div className='ProfileSettings__avatar-file'>
          <label htmlFor="upload-photo">Change</label>
          <input type="file" name="photo" id="upload-photo"
                  onChange={(e) => loadFile(e)}
                  className='ProfileSettings__avatar-fileInput' />
        </div>
      </div>
      <div className='ProfileSettings__inputBox'>
        <label htmlFor="ProfileSettings__input">Name</label>
        <TextField value={state.store.user.name} className='ProfileSettings__input' placeholder="Favorites" />
      </div>
      <div className='ProfileSettings__inputBox'>
        <label htmlFor="ProfileSettings__input">Role</label>
        <TextField value={state.store.user.role} className='ProfileSettings__input' placeholder="Favorites" />
      </div>
      <div className='ProfileSettings__inputBox'>
        <label htmlFor="ProfileSettings__textArea">Teams</label>
        <Autocomplete
          multiple
          value={userTeams}
          options={teams}
          renderInput={(params) => (
            <TextField {...params} className='ProfileSettings__textArea' placeholder="Teams" />
          )}
        />
      </div>
      <div className='ProfileSettings__textAreaBox'>
        <label htmlFor="ProfileSettings__textArea">About</label>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
        />
      </div>
      <div className='ProfileSettings__button-form'>
        <button className='TasksPage__button ProfileSettings__button'>Update Profile</button>
      </div>

    </div>
  );
};