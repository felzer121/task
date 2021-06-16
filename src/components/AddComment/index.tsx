import React from 'react'
import './style.scss'

const AddComment = () => {
  return (
    <div className='AddComment'>
      <img src='./Userpic.jpg' alt='' />
      <input className='AddComment__input' type='text' placeholder='Add a comment…' />
      <button className='AddComment__send'>Send</button>
    </div>
  )
}

export default AddComment
