import React, { useContext, useEffect } from 'react'
import {TaskManagerContext, TeamsType, UserFull} from '../../store/store'
import { useParams } from 'react-router-dom'
import { Header } from '../Header'
import { BoxScroll } from '../../element/BoxScroll'
import { Page } from '../Page'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './style.scss'
import {Button, IconButton} from "@mui/material";
import Card from "../../element/Card";

const TeamsList = () => {

  const state = useContext(TaskManagerContext)
  const [team, setTeam] = React.useState<TeamsType>()
  let { id } = useParams<{id: string}>();
  const [user, setUser] = React.useState<UserFull>()

  useEffect(() => {
    setTeam(state.store.teams.find(team => team.id === id))
  }, [state, id])

  const handleClick = (id: string) => {
    setUser(state.store.users.find(user => user.id === id))
  }
  const handleMoreUser = () => {
    console.log(user);
  }
  if(!team) return <div>'load'</div>

  return (
    <>
      <Header projectName={team.name} type={'teams'}  id={'0'}/>
      <div className='Team'>
        <Page title="Team">
            <div className='Team__container'>
            <BoxScroll style={{maxWidth: '385px'}}>
              <>
                <span className='Team__users'>Members <span className='Team__users-length'>{team.users.length}</span></span>
                <div className='Team__cards'>
                  {team.users.map(user => (
                    <Card key={user.id}>
                      <div className='Team__card active' onClick={()=>handleClick(user.id)}>
                        <div className='Team__cardUser'>
                          <img src={user.url} className='Team__cardAvatar' alt='' />
                          <div className='Team__cardInfo'>
                            <span className='Team__cardTxt'>{user.name}</span>
                            <p className='Team__cardTxt Team__cardRole'>{user.role}</p>
                          </div>
                        </div>
                        <div className='Team__cardTask'>
                          <span className='Team__cardTaskCount'>{user.open_task}</span>
                          <p className='Team__cardTasks'>TASKS</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            </BoxScroll>
            {
              !!user && <BoxScroll style={{maxWidth: '100%', marginLeft: '30px'}}>
                    <div className='Team__user'>
                        <div className='Team__userBox'>
                            <img src={user.url} className='Team__userAvatar' alt=""/>
                            <div className='Team__userInfo'>
                                <h4 className='Team__userInfoName'>{user.name}</h4>
                                <p className='Team__userInfoRole'>{user.role}</p>
                            </div>
                        </div>
                        <div>
                            <IconButton aria-label="Example" onClick={handleMoreUser} style={{height: '40px'}}>
                                <MoreHorizIcon />
                            </IconButton>
                        </div>
                    </div>
                </BoxScroll>
            }
          </div>
        </Page>
      </div>
    </>
  );
};

export { TeamsList }