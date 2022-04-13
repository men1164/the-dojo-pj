import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const docRef = doc(projectFirestore, collectionName, docId)

    const unsub = onSnapshot(docRef, (snap) => {
      if(snap.data()) {
        setDocument({ ...snap.data(), docId: snap.id })
        setError(null)
      }
      else {
        setError("No document exists")
      }
    }, (err) => {
      console.log(err)
      setError("failed to get document")
    })

    return () => unsub()

  }, [collectionName, docId])

  return { document, error }
}