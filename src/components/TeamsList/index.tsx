import React, { useContext, useEffect } from 'react'
import { TaskManagerContext, TeamsType } from '../../store/store'
import { useParams } from 'react-router-dom'
import { Header } from '../Header'
import { BoxScroll } from '../../element/BoxScroll'
import { Page } from '../Page'
import './style.scss'

const TeamsList = () => {

  const state = useContext(TaskManagerContext)
  const [team, setTeam] = React.useState<TeamsType>()
  let { id } = useParams<{id: string}>();

  useEffect(() => {
    setTeam(state.store.teams.find(team => team.id === id))
  }, [state, id])

  if(!team) return <div>'load'</div>

  return (
    <>
      <Header projectName={team.name} type={'teams'}  id={'0'}/>
      <div className='Team'>
        <Page title="Team">
          <BoxScroll>
            <>
              <span className='Team__users'>Members <span className='Team__users-length'>{team.users.length}</span></span>
              <div className='Team__cards'>
                {team.users.map(user => (
                  <div className='Team__card' key={user.id}>
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
                ))}
              </div>

            </>
          </BoxScroll>
        </Page>
      </div>
    </>
  );
};

export { TeamsList }