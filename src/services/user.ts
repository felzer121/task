import 'firebase/auth'
import {firebase} from './firebase'


export const singIn = async (email:string, password:string) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
  try {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  } catch (error) {
    // @ts-ignore
    return Promise.reject(error.message)
  }
  })
}
export const logOut = async () => {
  await firebase.auth().signOut()
}

export const authUser = async (email:string, password:string) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (error) {
    // @ts-ignore
    return Promise.reject(error.message)
  }
}


export const isUserAuth = async () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user)
      return user
  })

}