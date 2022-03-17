import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collectionName, _qr) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  const qr = useRef(_qr).current // To prevent infinite loop b/c qr is an array, useEffect will rerun infinite

  useEffect(() => {
    let ref = collection(projectFirestore, collectionName)

    if(qr) {
      ref = query(ref, where(...qr), orderBy('createdAt', 'desc'))
    }

    const unsub = onSnapshot(ref, snap => {
      let results = []
      snap.docs.forEach(doc => {
        doc.data().createdAt && results.push({ ...doc.data(), docId: doc.id })
        // results.push({ ...doc.data(), docId: doc.id })
      })

      setDocuments(results)
      setError(null)
    }, err => {
      console.log(err)
      setError('Could not fetch the data')
    })

    return () => unsub()

  }, [collectionName, qr])

  return { documents, error }
}