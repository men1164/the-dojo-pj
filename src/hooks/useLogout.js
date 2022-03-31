import { signOut } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  const [isCancelled, setIsCancelled] = useState(false)

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      const { uid } = user
      const ref = doc(projectFirestore, "users", uid)
      await updateDoc(ref, { online: false })
      
      await signOut(projectAuth)
      dispatch({ type: 'LOGOUT' })
      
      // if component unmounted, cancelled updating state
      if(!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch(err) {
      if(isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true) // Cleanup function
  }, [])

  return { logout, isPending, error }
}

export default useLogout