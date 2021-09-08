import React, { useContext, useState, useEffect } from "react"
import { firebase } from "../services/firebase"

// @ts-ignore
const AuthContext = React.createContext()

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
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
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