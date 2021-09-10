import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';

import { CONFIG } from '../config'
import 'firebase/auth'
import 'firebase/database'
import { TaskType } from '../pages/TasksPage/types'
import { ProjectType } from '../components/SideBarList'

firebase.initializeApp(CONFIG.firebaseConfig)

const db = firebase.firestore();

export const createProject = async (project: ProjectType) => {
  let id = ''
  await db.collection("todo").add(project)
    .then((docRef) => {
      id = docRef.id
    })
  return id
}

export const createTask = (task: TaskType, id: string) => {
  const todoProject = db.collection("todo").doc(id);
  return todoProject.update({
    tasks : firebase.firestore.FieldValue.arrayUnion(task)
  }).catch((error) => {
    console.error("Error adding document: ", error);
  });
}

export const getProject = async ():Promise<ProjectType[]> => {
  let projects:ProjectType[] = [];
  await db.collection("todo").get().then((querySnapshot) => {
    querySnapshot.forEach((doc:any) => {
      projects.push({id: doc.id, ...doc.data()})
    });
  });
  return projects
}

export const getTasks = async ():Promise<TaskType[]> => {
  let tasks:TaskType[] = [];
  await db.collection("tasks").get().then((querySnapshot) => {
    querySnapshot.forEach((doc:any) => {
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
      console.error("Error updating document: ", error);
    });
}

export { firebase }
