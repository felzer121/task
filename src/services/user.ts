import 'firebase/auth'
import { firebase } from './firebase'


export const singIn = async (email:string, password:string) => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
  try {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  } catch (error) {
    return Promise.reject(error.message)
  }
  })
}
export const authUser = async (email:string, password:string) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
    return userCredential
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export const isUserAuth = async () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user)
      return user
  });

}