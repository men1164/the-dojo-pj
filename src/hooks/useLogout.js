import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const [isCancelled, setIsCancelled] = useState(false)

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
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