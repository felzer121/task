import React from 'react'
import './style.scss'
import { motion } from "framer-motion";

const AddComment = () => {
  return (
    <div className='AddComment'>
      <img src='./Userpic.jpg' alt='' />
      <motion.textarea className='AddComment__input'
             placeholder='Add a comment…'
             whileFocus={{
               height: ['40px', '150px'],
             }}
      />
      <button className='AddComment__send'>Send</button>
    </div>
  )
}

export default AddComment
