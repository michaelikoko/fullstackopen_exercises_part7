import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const User = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })

  const id = useParams().id

  if (result.isLoading) {
    return (
      <div className="container w-100 d-flex flex-column mt-5 align-items-center justify-content-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  const users = result.data
  const user = users.find((user) => user.id === id)
  return (
    <div className='container mt-3'>
      <h2>{user.name}</h2>
      <div className='fw-bold'>added blogs</div>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
