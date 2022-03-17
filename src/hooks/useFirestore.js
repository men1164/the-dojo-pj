import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch(action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'ERRPR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}


export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)
  
  const ref = collection(projectFirestore, collectionName)
  
  // Perform IF check, if user didn't go to other page before state updated
  const dispatchIfNotCancelled = (action) => {
    if(!isCancelled){
      dispatch(action)
    }
  }

  const addDocument = async (document) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp()
      const addedDoc = await addDoc(ref, { ...document, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDoc })
    }
    catch(err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    const docRef = doc(projectFirestore, collectionName, id)

    try {
      await deleteDoc(docRef)
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch(err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}