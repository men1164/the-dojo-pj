import { useState } from 'react'
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  return (
    <form className="auth-form">
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
        <input type="file" required />
      </label>
      <button className="btn">Sign up</button>
    </form>
  )
}
