import React, { useState } from 'react';
import './style.scss'
import { useHistory } from 'react-router-dom';

interface authField {
  email: string
  password: string
}

const Auth = () => {
  const history = useHistory();
  const [authField, setAuthField] = useState<authField>({email: '', password: ''})
  const [error, setError] = useState('')


  const authentication = async () => {
    try {
      history.push("/project");
    } catch (error) {
      setError(error)
    }
  }
  return (
    <div className='auth'>
      <div className='auth__modal'>
        <div className='auth__modalTitle'>
          <img src='/static/media/Logo.8b0896ca.svg' className='auth__icon' alt=""/>
          <h2 className='auth__modalTitle-txt'>Tasker</h2>
        </div>
        <p style={{color: 'rgb(166, 166, 166)', fontWeight: 600}}>Тестовые креды admin@mail.ru пароль admin123</p>
        {/*<button className='auth__button auth__social'>Use Google Account</button>*/}
        {
          error !== '' ?
              <div className='register__error'>
                <div className='register__title'>Action Error</div>
                <span>{ error }</span>
              </div> : ''
        }
        <div className='auth__block'>
          <label htmlFor="email" className='auth__title'>Email</label>
          <input type="text" id='email' value={authField.email} onChange={(event)=>{setAuthField({...authField, email: event.target.value})}} placeholder='email' />
          <label htmlFor="password" className='auth__title'>Password</label>
          <input type="text" id='password' onChange={(event)=>{setAuthField({...authField, password: event.target.value})}} placeholder='password' />
        </div>
        <button className='auth__button' onClick={authentication}>Sign in</button>
      </div>
    </div>
  );
};

export { Auth };