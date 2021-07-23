import React from 'react';
import './style.scss'
import logo from '../../logo.svg'

const Auth = () => {
  return (
    <div className='auth'>
      <div className='auth__modal'>
        <img src='/static/media/Logo.8b0896ca.svg' className='auth__icon' alt=""/>
        <button className='auth__button auth__social'>Use Google Account</button>
        <div className='auth__block'>
          <label htmlFor="email" className='auth__title'>Email</label>
          <input type="text" id='email' placeholder='email' />
          <label htmlFor="password" className='auth__title'>Password</label>
          <input type="text" id='password' placeholder='password' />
        </div>
        <button className='auth__button'>Sign Up</button>
      </div>
    </div>
  );
};

export { Auth };