import React, { useState } from 'react';
import { singIn } from '../../services/user';
import './style.scss'

interface SingInFields {
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const [singInFields, setSingInFields] = useState<SingInFields>({email:'', password:'', confirmPassword:''})
  const [error, setError] = useState('')

  const register = async () => {
    if (singInFields.password.length < 6) {
      setError('ваш пароль меньше 6 символов')
    } else if (singInFields.password !== singInFields.confirmPassword) {
      setError('пароли не совпадают')
    }
    else {
      try {
        await singIn(singInFields.email, singInFields.password)
      } catch (error) {
        // @ts-ignore
        setError(typeof error === 'string' ? error : '')
      }
    }
  }

  return (
    <div className='register'>
      <div className='register__modal'>
        <img src="/static/media/Logo.8b0896ca.svg" className='register__icon' alt="" />
        <div className='register__block'>
          {
            error !== '' ?
              <div className='register__error'>
                <div className='register__title'>Action Error</div>
                <span>{ error }</span>
              </div> : ''
          }
          <label htmlFor="email" className='auth__title'>Email</label>
          <input type="text" id='email' value={singInFields.email} onChange={(event)=>{setSingInFields({...singInFields, email: event.target.value})}} placeholder='email' />
          <label htmlFor="password" className='auth__title'>Password</label>
          <input type="text" id='password' value={singInFields.password} onChange={(event)=>{setSingInFields({...singInFields, password: event.target.value})}} placeholder='password' />
          <label htmlFor="password" className='auth__title'>Return password</label>
          <input type="text" id='password' value={singInFields.confirmPassword} onChange={(event)=>{setSingInFields({...singInFields, confirmPassword: event.target.value})}} placeholder='password' />
        </div>
        <button className='register__button' disabled={singInFields.password === ''} onClick={register}>Register</button>
      </div>
    </div>
  );
};

export { Register };