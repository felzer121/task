import React, { useContext, useEffect } from 'react'
import { TaskManagerContext, TeamsType, UserFull } from '../../store/store'
import {useNavigate, useParams} from 'react-router-dom'
import { Header } from '../Header'
import { BoxScroll } from '../../element/BoxScroll'
import { Page } from '../Page'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Checkbox, IconButton} from "@mui/material";
import Card from "../../element/Card";
import './style.scss'
import Loader from "../Loader/Loader";
import {Tag} from "../../element/Tag";

const TeamsList = () => {
  const state = useContext(TaskManagerContext)
  let { id } = useParams<{id: string}>()

  const [team, setTeam] = React.useState<TeamsType>()
  const [activeUser, setActiveUser] = React.useState<UserFull>()
  const [tasks, setTasks] = React.useState<any>()
  const navigate = useNavigate()

  useEffect(() => {
    const baseUser = state.store.users.find((user, index) => index === 0)
    setTeam(state.store.teams.find(team => team.id === id))
    setActiveUser(baseUser)
    setTasks(state.store.projects.map(project => project.tasks.filter(task => {return task.userID === baseUser?.id})))
  }, [state, id])

  const handleClick = (id: string) => {
    setActiveUser(state.store.users.find(user => user.id === id))
    setTasks(state.store.projects.map(project => project.tasks.filter(task => task.userID === id)))
  }
  const handleMoreUser = () => {
    // console.log(activeUser);
  }
  const handleTaskClick = (id:string, idProject:string, event: React.MouseEvent) => {
    const { className } = event.target as HTMLDivElement;
   if(className === 'tasksElement__card')
     navigate(`/dashboard/${idProject}/task-page`)
  }
  if(!team) return <Loader />

  return (
    <>
      <Header projectName={team.name} type={'teams'} id={'0'}/>
      <div className='Team'>
        <Page title="Team">
          <div className='Team__container'>
            <BoxScroll style={{maxWidth: '385px'}}>
              <>
                <span className='Team__users'>Members <span
                  className='Team__users-length'>{team.users.length}</span></span>
                <div className='Team__cards'>
                  {team.users.map(user => (
                    <Card key={user.id} isActive={user.id === activeUser?.id} type={'card'}>
                      <div className='Team__card active' onClick={() => handleClick(user.id)}>
                        <div className='Team__cardUser'>
                          <img src={user.url} className='Team__cardAvatar' alt=''/>
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
              !!activeUser && <BoxScroll style={{maxWidth: '100%', marginLeft: '30px'}}>
                    <div className='Team__user'>
                        <div className='Team__userBox'>
                            <img src={activeUser.url} className='Team__userAvatar' alt=""/>
                            <div className='Team__userInfo'>
                                <h4 className='Team__userInfoName'>{activeUser.name}</h4>
                                <p className='Team__userInfoRole'>{activeUser.role}</p>
                                <p className='Team__userInfoLocation'>{activeUser.location}</p>
                            </div>
                        </div>
                        <div>
                            <IconButton aria-label="Example" onClick={handleMoreUser} style={{height: '40px'}}>
                                <MoreHorizIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className='Team__assignedTask'>
                      <h3>Assigned Tasks</h3>
                      {tasks.map((taskProject:any) => (
                        taskProject.map((task:any) => (
                          <div key={task.id} className='tasksElement' onMouseDown={(e) => handleTaskClick(task.id, task.idProject, e)}>
                            <div className='tasksElement__checkbox'>
                              <Checkbox
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />
                            </div>
                            <Card type={'task'}>
                              <div className='tasksElement__card'>
                                <p>{task.title}</p>
                                <Tag tag={task.tag} />
                              </div>
                            </Card>
                          </div>
                        ))
                      ))}
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