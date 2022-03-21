import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCjosnJ4kkRBmTU31csV9XMGQ8LmGeN8FE",
  authDomain: "the-dojo-f5a8f.firebaseapp.com",
  projectId: "the-dojo-f5a8f",
  storageBucket: "the-dojo-f5a8f.appspot.com",
  messagingSenderId: "739495246093",
  appId: "1:739495246093:web:d1c3c5adaad14e92441844"
};

// init firebase app
const firebase = initializeApp(firebaseConfig)

// init services
const projectFirestore = getFirestore(firebase)
const projectAuth = getAuth(firebase)
const projectStorage = getStorage(firebase)

const timestamp = serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }