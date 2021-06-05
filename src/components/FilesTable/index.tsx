import React from 'react'
import './style.scss'
import { FileType } from './types'

interface FilesTableProps {
  files: FileType[]
}

const FilesTable = ({ files }: FilesTableProps) => {
  return (
    <div className='FilesTable'>
      {files.map(file => {
        return (
          <div className='FilesTable__element'>
            <ul className='FilesTable__item'>
              <li className='FilesTable__icon FilesTable__itemElem'>
                <img src={file.icon} alt={file.name} />
              </li>
              <li className='FilesTable__itemElem FilesTable__itemElem-name'>{file.name}</li>
              <li className='FilesTable__itemElem'>{file.size}</li>
              <li className='FilesTable__itemElem'>{file.author}</li>
              <li className='FilesTable__itemElem'>
                <div className='TasksPage__aboutItemTag'>
                  <span className='TasksPage__aboutItemTagSpan'>{file.tag}</span>
                </div>
              </li>
              <li className='FilesTable__itemElem'>08 Jan 2019</li>
            </ul>
            <div className='FilesTable__actions'>
              <button className='FilesTable__actionButton'>
                Actions
                <svg
                  width='10'
                  height='6'
                  viewBox='0 0 10 6'
                  fill='none'
                  className='FilesTable__actionSvg'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M9.76246 0.684322L9.28117 0.22601C9.11438 0.075351 8.91958 0 8.69722 0C8.47027 0 8.27779 0.075351 8.11946 0.22601L5.00002 3.19558L1.88061 0.226096C1.7223 0.0754366 1.52977 8.56018e-05 1.30291 8.56018e-05C1.08044 8.56018e-05 0.885688 0.0754366 0.718878 0.226096L0.243897 0.684408C0.0812692 0.839111 0 1.0245 0 1.24041C0 1.46034 0.0813591 1.64364 0.243875 1.79025L4.4223 5.76785C4.57641 5.92257 4.76887 6 5 6C5.22679 6 5.42152 5.92259 5.58399 5.76785L9.76244 1.79025C9.92078 1.63951 10 1.45624 10 1.24041C10 1.02853 9.9208 0.843242 9.76246 0.684322Z'
                    fill='black'
                  />
                </svg>
              </button>
              <button className='FilesTable__downloadButton'>
                <svg
                  width='16'
                  height='18'
                  fill='#9B9B9B'
                  viewBox='0 0 16 18'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M4.17187 5.26163C4.37549 5.05744 4.64213 4.95565 4.90839 4.95565C5.17515 4.95565 5.44142 5.05744 5.64492 5.26163L6.94891 6.56914V1.04443C6.94891 0.467635 7.41524 0 7.99044 0C8.566 0 9.03246 0.467635 9.03246 1.04443V6.63982L10.4068 5.26163C10.6103 5.05744 10.8766 4.95565 11.1433 4.95565C11.4095 4.95565 11.6762 5.05744 11.8797 5.26163C12.1302 5.51229 12.2251 5.85945 12.1676 6.18448L12.1671 6.18497C12.1628 6.20858 12.1556 6.23107 12.1494 6.25418C12.1407 6.2902 12.1312 6.32622 12.1178 6.36077C12.1092 6.38425 12.0995 6.40736 12.089 6.43035C12.0728 6.46686 12.0536 6.50152 12.033 6.53656C12.0221 6.55475 12.012 6.57307 12 6.59077C11.9641 6.64216 11.9253 6.69207 11.8794 6.73817L8.76999 9.85622C8.56649 10.0603 8.29973 10.1616 8.03347 10.1616H8.01863C7.752 10.1616 7.48573 10.0603 7.28223 9.85622L4.17236 6.73817C4.12688 6.69207 4.08814 6.64265 4.05271 6.59077C4.04021 6.57307 4.03016 6.55426 4.01912 6.53607C3.99853 6.50152 3.9799 6.46686 3.96359 6.43084C3.95305 6.40736 3.943 6.38375 3.93441 6.36027C3.92191 6.32573 3.91235 6.29119 3.90328 6.25603C3.89751 6.23206 3.88942 6.20858 3.88513 6.18399C3.82666 5.85945 3.92142 5.51229 4.17187 5.26163ZM16 15.4857C16 16.8955 14.6213 18 12.861 18H3.13905C1.37914 18 0 16.8955 0 15.4857V8.69894C0 7.50748 0.986484 6.53656 2.3541 6.26377C2.41356 6.852 2.67063 7.39758 3.09308 7.82108L3.49628 8.2254H3.13905C2.42643 8.2254 2.03524 8.58117 2.03524 8.69894V15.4857C2.03524 15.6037 2.42643 15.9596 3.13905 15.9596H12.8614C13.5741 15.9596 13.9652 15.6033 13.9652 15.4857V8.69894C13.9652 8.58117 13.5736 8.2254 12.8614 8.2254H12.5555L12.9587 7.82108C13.3787 7.39991 13.6349 6.85827 13.6957 6.27434C15.0374 6.56053 16 7.52235 16 8.69931V15.4857Z' />
                </svg>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { FilesTable }
