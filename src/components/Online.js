import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'
import './Online.css'

export default function Online() {
  const { documents, error } = useCollection('users')

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents && documents.map(user => (
        <div key={user.docId} className="user-list-item">
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}
