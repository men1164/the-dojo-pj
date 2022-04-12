import './Create.css'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { Timestamp } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'

const categories = [
  { value: "development", label: "Development" },
  { value: "Design", label: "Design" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
]

export default function Create() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [error, setError] = useState(null)
  const { user } = useAuthContext()
  
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  useEffect(() => {
    if(documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = e => {
    e.preventDefault()
    setError(null)
    
    if(!category) {
      setError("Please select project's category")
      return
    }

    if(assignedUsers.length < 1) {
      setError("Please assign this project to a user")
      return
    }

    // Clean data
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    const assignedUsersList = assignedUsers.map(u => {
      return { displayName: u.value.displayName, photoURL: u.value.photoURL, id: u.value.docId }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    console.log(project)
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input type="text" onChange={e => setName(e.target.value)} value={name} required />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea type="text" onChange={e => setDetails(e.target.value)} value={details} required></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input type="date" onChange={e => setDueDate(e.target.value)} value={dueDate} required />
        </label>
        <label>
          <span>Project Category:</span>
          <Select onChange={option => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assigned to:</span>
          <Select onChange={option => setAssignedUsers(option)} options={users} isMulti />
        </label>
        <button className="btn">Add</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
