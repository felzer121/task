import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Auth } from './pages/Auth'
import { Register } from './pages/Register'
import { PrivateRoute } from './components/PrivateRoute'
import {AuthProvider, useAuth} from './store/auth'
import { Dashboard } from './pages/Dashboard'
import {ProfilePage} from "./pages/ProfilePage";
import {TeamsPage} from "./pages/TeamsPage";
import {RouterManeger} from "./RouterManeger/Router";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/register' element={<Register/>} />
        </Routes>
       <RouterManeger />
      </AuthProvider>
    </Router>
  )
}

export default App
