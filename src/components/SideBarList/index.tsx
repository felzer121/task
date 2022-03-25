import React, { useState, useContext } from 'react';
import { ACTION, TaskManagerContext } from "../../store/store";
import './style.scss'
import plusIcon from './plus.svg'
import Modal from '../Modal';
import { createProject } from '../../services/firebase'
import { TaskType } from "../../pages/TasksPage/types";
import { NavLink } from "react-router-dom";

export type SideBarListItem = {
    title: string,
    count?: number,
    icon?: string,
    users?: string[]
};

export type Users = {
  id: string
  name: string
  namePic: string
  url: string
}

interface SideBarListProps {
  list?: SideBarListItem[],
  isProject?: boolean,
  title: string
}

export interface ProjectType {
  id: string
  name: string
  icon?: string
  description: string
  tasks: TaskType[]
}

function SideBarList({ list, isProject, title }: SideBarListProps) {
  const state = useContext(TaskManagerContext)
  const [isOpen, setIsOpen] = useState({
    isModalOpen: false,
    isSelectOpen: false
  })
  const icons = ['/icon/project1.svg', '/icon/project2.svg', '/icon/project3.svg', '/icon/project4.svg']
  const [value, setValue] = useState<ProjectType>({
    id: '',
    name: '',
    icon: icons[0],
    description: '',
    tasks: []
  })
  const openedModal = () => {
    setIsOpen({...isOpen, isModalOpen: true})
  }
  const onCreateProject = () => {
    createProject(value).then(e => state.dispatch({action: ACTION.CREATE_PROJECT, data:{ ...value, id: e }}))
    setIsOpen({...isOpen, isModalOpen: false})
  }
  const selectOnHandle = () => {
    setIsOpen({...isOpen, isSelectOpen: !isOpen.isSelectOpen})
  }
  const selectItemOnHandle = (icon:string) => {
    setValue({...value, icon: icon})
    setIsOpen({...isOpen, isSelectOpen: false})
  }

  return (
    <div className="SideBarList">
      <Modal open={isOpen.isModalOpen} onCloseClick={() => setIsOpen({...isOpen, isModalOpen: false})}>
        <div className="modalProject__input-box">
          <div className="modalProject__input">
            <label htmlFor="name" className="ModalTask__label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="ModalTask__input"
              value={value.name}
              onChange={e => setValue({
                ...value,
                name: e.target.value
              })}
              placeholder="e.g Designer, Developers or Finance"
            />
          </div>
          <div className="modalProject__select">
            <label className="ModalTask__label">
              Icon
            </label>
            <div className="modalProject__selectActive" onClick={selectOnHandle}>
              <img src={value.icon} alt="" />
            </div>
            { isOpen.isSelectOpen &&
              <div className='modalProject__selectDrop'>
                {icons.map(icon => {
                  return (
                    <div className='modalProject__selectItem' key={icon} onClick={() => selectItemOnHandle(icon)}>
                      <img className='modalProject__selectIcon' src={icon} alt="icon" />
                    </div>
                  )
                })}
              </div>
            }
          </div>
        </div>
        <div className="ModalTask__input-box">
          <label htmlFor="description" className="ModalTask__label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={value.description}
            onChange={e => setValue({
              ...value,
              description: e.target.value
            })}
            className="ModalTask__input"
            placeholder="e.g Designer, Developers or Finance"
          />
        </div>
        <button className="ModalTask__button" onClick={() => onCreateProject()}>
          Create Project
        </button>
      </Modal>
      <div className="SideBarList__title">
        <h2 className="SideBarList__titleSpan">{title}</h2>
        {isProject && <div className="SideBarList__titleAdd">
          <img className="SideBarList__titleAddIcon"
               src={plusIcon}
               alt=""
               onClick={() => openedModal()}
          />
        </div>}
      </div>
      {isProject && state.store.projects.map(project => {
        return (
          <NavLink className="SideBarList__item" activeClassName='SideBarList__item-active' key={ project.id } to={`/dashboard/${ project.id }`}>
            <img className="SideBarList__icon" src={ project.icon } alt="" />
            { project.name }
          </NavLink>
        )
      })}
      {list?.map((item) =>
        <div className="SideBarList__item" key={item.title}>
          { item?.icon && <img src={item.icon} className="SideBarList__icon" alt={item.title} /> }
          { item.title } { item?.count && <span className="SideBarList__number">{ item.count }</span> }
          { item?.users && <div className="SideBarList__teams">{ item.users.map(item => <img key={item} src={item} className="SideBarList__teamsImg" alt={item} />) }</div> }
        </div>)}
    </div>
  );
}

export { SideBarList };
