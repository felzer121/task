import React, {useContext} from 'react';
import './style.scss'
import {loadAvatar, updateAvatar, updateUser} from "../../services/firebase";
import {ACTION, TaskManagerContext, TeamsType, User} from "../../store/store";
import {Autocomplete, TextField} from "@mui/material";
import {useHistory} from "react-router-dom";


export const ProfileSettings = () => {
  const state = useContext(TaskManagerContext)
  let url: string | ArrayBuffer | null = null
  const history = useHistory();

  const [value, setValue] = React.useState<User>({
    name: '',
    role: '',
    teams: [],
    about: ''
  })
  React.useEffect(() => {
    setValue({
      name: state.store.user.name,
      role: state.store.user.role,
      teams: state.store.user.teams,
      about: ''
    })
  }, [state])

  const handleChange =
    (prop: string) =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue({...value, [prop]: event.target.value})
      }
  const handleAutocompleteChange = (prop: string, newValue: TeamsType[]) => {
    setValue({...value, teams: [...newValue]})
  }
  const handleClick = () => {
    updateUser({...state.store.user, ...value}, state.store.teams).then()
    state.dispatch({action: ACTION.UPDATE_USER, data: {...state.store.user, ...value}})
    history.push('/home')
  }

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
        <TextField value={value.name} onChange={handleChange('name')}
                   className='ProfileSettings__input' placeholder="Favorites" />
      </div>
      <div className='ProfileSettings__inputBox'>
        <label htmlFor="ProfileSettings__input">Role</label>
        <TextField value={value.role} onChange={handleChange('role')}
                   className='ProfileSettings__input' placeholder="Favorites" />
      </div>
      <div className='ProfileSettings__inputBox'>
        <label htmlFor="ProfileSettings__textArea">Teams</label>
        <Autocomplete
          multiple
          value={value.teams}
          options={state.store.teams}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => handleAutocompleteChange('teams', newValue)}
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
          onChange={handleChange('about')}
          rows={4}
        />
      </div>
      <div className='ProfileSettings__button-form'>
        <button className='TasksPage__button ProfileSettings__button' onClick={handleClick}>Update Profile</button>
      </div>
    </div>
  );
};