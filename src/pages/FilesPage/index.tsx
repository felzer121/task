import React from 'react'
import './style.scss'
import { FilesTitle } from '../../components/FileTitle'
import { FilesTabel } from '../../components/FilesTabel'

interface FilesPageProps {}

const FilesPage = ({}: FilesPageProps) => {
  return (
    <div className='FilesPage'>
      <FilesTitle />
      <FilesTabel />
    </div>
  )
}

export { FilesPage }
