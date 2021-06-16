import React from 'react'
import { CommentType } from '../Discussion/types'
import './style.scss'

interface CommentProps {
  comment: CommentType
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className='Comment'>
      <img className='Comment__icon' src={comment.icon} alt='' />
      <div className='Comment__content'>
        <div className='Comment__info'>
          <span>
            <span className='Comment__name'>{comment.name}, </span>
            <span className='Comment__position'>{comment.position}</span>
          </span>
          <span className='Comment__time'>{comment.time}</span>
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  )
}

export default Comment
