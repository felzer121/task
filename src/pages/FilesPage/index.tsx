import React from 'react'
import './style.scss'
import { FilesTitle } from '../../components/FileTitle'
import { FilesTable } from '../../components/FilesTable'
import { FileType } from '../../components/FilesTable/types'
import {useOutletContext} from "react-router-dom";
import {ProjectType} from "../../components/SideBarList";


const FilesPage = () => {
  const project = useOutletContext<ProjectType>()
  const files = project.tasks.map(item => item.files).flat()
  return (
    <div className='FilesPage'>
      <FilesTitle/>
      <FilesTable files={files}/>
    </div>
  )
};

export { FilesPage }
