import 'firebase/auth'
import { firebase } from './firebase'

export const singIn = async (email:string, password:string) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
  } catch (error) {
    return Promise.reject(error.message)
  }
}