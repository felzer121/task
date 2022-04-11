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
const storage = firebase.storage();

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

export const createTask = (task: TaskType, id: string | undefined) => {
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
  })
  return projects
}

export const getUrlAvatar = async (name: string) => {
  return storage.ref(name).getDownloadURL().then()
}
export const getUrlAvatarTeams = async (teams: TeamsType[]): Promise<any[]> => {
  const arrayImg = teams.map(team => team.users.map(user => user.namePic))
  const result:any = []
  for(let i = 0; i < arrayImg.length; i++) {
    const pathImg = arrayImg[i].map(async name => await storage.ref(name).getDownloadURL())
    result.push(Promise.all(pathImg))
  }
  return Promise.all(result)
}

export const getUsers = async (): Promise<UserFull[]> => {
  let users:UserFull[] = [];
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

export const updateUser = async (user: UserFull, teams: TeamsType[]) => {
  const taskRef = db.collection("users").doc(user.id);
  const teamsRef = db.collection("teams")
  taskRef.update({
    name: user.name,
    role: user.role,
    teams: user.teams.map(team => {return { id: team.id, name: team.name }}),
    about: user.about
  })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  user.teams.map(userTeam => {
    const currentTeams = teams.find(item => item.id === userTeam.id)!.users
    if(!currentTeams.some(team => team.id.includes(user.id)))
      teamsRef.doc(userTeam.id).update({ users: [...currentTeams, {name: user.name, namePic: user.namePic, id: user.id} ] })
    return ''
  })
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
