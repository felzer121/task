import React from 'react'
import './style.scss'
import { FilesTitle } from '../../components/FileTitle'
import { FilesTable } from '../../components/FilesTable'
import { FileType } from '../../components/FilesTable/types'

interface FilesPageProps {
  files: FileType[]
}

const FilesPage = ({ files }: FilesPageProps) => {
  return (
    <div className='FilesPage'>
      <FilesTitle />
      <FilesTable files={files} />
    </div>
  )
}

export { FilesPage }
