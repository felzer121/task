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
import {ProjectType, Users} from '../components/SideBarList'
import {TeamsType, UserFull} from "../store/store";


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
export const loadAvatar = async (url: string, file: any) => {
  let newPath = ''
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`images/${url}`);
  await imageRef.put(file).then((snapshot) => {
    newPath = snapshot.metadata.fullPath
  })
  return newPath
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

export const getUrlAvatar = async (name: string) => {
  const storage = firebase.storage();
  return storage.ref(name).getDownloadURL().then()
}

export const getUsers = async (): Promise<Users[]> => {
  let users:Users[] = [];
  await db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc:any) => {
      users.push({id: doc.id, ...doc.data()})
    })
  })
  return users
}
export const getTeams = async (): Promise<TeamsType[]> => {
  let teams:TeamsType[] = [];
  await db.collection("teams").get().then((querySnapshot) => {
    querySnapshot.forEach((doc:any) => {
      teams.push({id: doc.id, ...doc.data()})
    })
  })
  return teams
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

export const updateAvatar = async (user: Users) => {

  const taskRef = db.collection("users").doc(user.id);

  return taskRef.update({
    namePic: user.namePic
  })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
}

export const updateUser = async (user: UserFull) => {
  const taskRef = db.collection("users").doc(user.id);
  return taskRef.update({
    name: user.name,
    role: user.role,
    teams: user.teams,
    about: user.about
  })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
}

export const updateTask = async (task:TaskType) => {
  const taskRef = db.collection("tasks").doc(task.id);

  return taskRef.update({
    isDone: task.isDone
  })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
}

export { firebase }
