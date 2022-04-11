import React from 'react'
import './style.scss'

const AddComment = () => {
  return (
    <div className='AddComment'>
      {/*<img src='./Userpic.jpg' alt='' />*/}
      <textarea className='AddComment__input'
             placeholder='Add a comment…'
      />
      <button className='AddComment__send'>Send</button>
    </div>
  )
}

export default AddComment
