import React from 'react'
import './style.scss'
import AddComment from '../AddComment'
import { CommentType } from './types'
import Comment from '../Commet'

interface DiscussionProps {
  comments: CommentType[]
}

const Discussion = ({ comments }: DiscussionProps) => {
  return (
    <div className='Discussion'>
      <h3 className='Discussion__title'>Discussion</h3>
      <AddComment />
      <div className='Discussion__comments'>
        {comments.map(commentItem => (
          <Comment key={commentItem.id} comment={commentItem} />
        ))}
      </div>
    </div>
  )
}

export default Discussion
