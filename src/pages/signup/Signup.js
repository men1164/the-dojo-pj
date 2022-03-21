import { useState } from 'react'
import useSignup from '../../hooks/useSignup'
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const types = ['image/jpeg', 'image/png']

  const handleSubmit = e => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
    // console.log(email, password, displayName, thumbnail)
  }

  const handleChange = e => {
    setThumbnail(null)
    let selected = e.target.files[0]

    if(selected && types.includes(selected.type)) {
      setThumbnail(selected)
      setThumbnailError(null)
    }
    else {
      setThumbnail(null)
      setThumbnailError('Please selected an image file (PNG or JPG)')
    }

    // if(!selected) {
    //   setThumbnailError('Please select a file')
    //   return
    // }
    // if(!selected.type.includes('image')) {
    //   setThumbnailError('Please select an image file')
    //   return
    // }
    // if(selected.size > 100000) {
    //   setThumbnailError('File size must be less than 100kb')
    //   return
    // }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>Email:</span>
        <input type="email" onChange={e => setEmail(e.target.value)} value={email} required />
      </label>
      <label>
        <span>Password:</span>
        <input type="password" onChange={e => setPassword(e.target.value)} value={password} required />
      </label>
      <label>
        <span>Display Name:</span>
        <input type="text" onChange={e => setDisplayName(e.target.value)} value={displayName} required />
      </label>
      <label>
        <span>Profile Picture:</span>
        <input type="file" onChange={handleChange} required />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Signing up...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
