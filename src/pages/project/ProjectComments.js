import { formatDistanceToNow } from "date-fns"
import { Timestamp } from "firebase/firestore"
import { useState } from "react"
import Avatar from "../../components/Avatar"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"


export default function ProjectComments({ project }) {
  const [comment, setComment] = useState('')
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore("projects")

  const handleSubmit = async e => {
    e.preventDefault()

    const newComment = {
      displayName: user.displayName,
      id: Math.random() * 100,
      photoURL: user.photoURL,
      content: comment,
      createdAt: Timestamp.fromDate(new Date())
    }

    await updateDocument(project.docId, {
      comments: [...project.comments, newComment ]
    })

    if(!response.error) {
      setComment('')
    }
  }
  
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <ul>
        {project.comments.length > 0 && project.comments.map(com => (
          <li key={com.id}>
            <div className="comment-author">
              <Avatar src={com.photoURL} />
              <p>{com.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{ formatDistanceToNow(com.createdAt.toDate(), { addSuffix: true }) }</p>
            </div>
            <div className="comment-content">
              <p>{com.content}</p>
            </div>
          </li>
        ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment</span>
          <textarea onChange={e => setComment(e.target.value)} value={comment} required></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  )
}
