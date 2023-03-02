import React, {useContext, useEffect, useState} from "react"
import {firebase} from "../services/firebase"

const authContextDefault = {
  currentUser: null
}

const AuthContext = React.createContext(authContextDefault)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }:any) {
  const [currentUser, setCurrentUser] = useState<any>()
  const [loading, setLoading] = useState(true)

  function signup(email:string, password:string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function login(email:string, password:string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return firebase.auth().signOut()
  }

  function resetPassword(email:string) {
    return firebase.auth().sendPasswordResetEmail(email)
  }


  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}