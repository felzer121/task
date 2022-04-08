import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
    <BrowserRouter>
      <AuthProvider>
       <RouterManeger />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
