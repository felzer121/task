import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './store/auth'
import { RouterManeger } from "./RouterManeger/Router";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
       <RouterManeger />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
