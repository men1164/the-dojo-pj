import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"
import { useAuthContext } from "../hooks/useAuthContext"

const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const [isCancelled, setIsCancelled] = useState(false)

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await createUserWithEmailAndPassword(projectAuth, email, password)
      if(!res) {
        throw new Error('Could not signup with email and password')
      }

      const filePath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const storageRef = ref(projectStorage, filePath)

      await uploadBytes(storageRef, thumbnail)
      const photoURL = await getDownloadURL(storageRef)
      
      await updateProfile(res.user, { displayName, photoURL })

      await setDoc(doc(projectFirestore, "users", res.user.uid), {
        online: true,
        displayName,
        photoURL
      })

      dispatch({ type: 'LOGIN', payload: res.user })

      if(!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    }
    catch (err) {
      if(!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true) // Cleanup function
  }, [])

  return { error, isPending, signup }
}

export default useSignup