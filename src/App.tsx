import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import { Auth } from './pages/Auth'
import { Register } from './pages/Register'
import { PrivateRoute } from './components/PrivateRoute'
import { AuthProvider } from './store/auth'
import { Dashboard } from './pages/Dashboard'
import {ProfilePage} from "./pages/ProfilePage";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/register' component={Register} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
