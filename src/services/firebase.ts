import firebase from 'firebase'
import { CONFIG } from '../config'
import 'firebase/auth'
import 'firebase/database'
import { TaskType } from '../pages/TasksPage/types'

firebase.initializeApp(CONFIG.firebaseConfig)

const db = firebase.firestore();

export const createTask = (task: TaskType) => {
  db.collection("tasks").add(task)
    .then((docRef) => {
      docRef.update({
        id: docRef.id
      })
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export const getTasks = async ():Promise<TaskType[]> => {
  let tasks:TaskType[] = [];
  await db.collection("tasks").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // @ts-ignore
      tasks.push(doc.data())
    });
  }); 
  return tasks
}

export const updateTask = async (task:TaskType) => {
  var taskRef = db.collection("tasks").doc(task.id);

  return taskRef.update({
    isDone: task.isDone
  })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}
