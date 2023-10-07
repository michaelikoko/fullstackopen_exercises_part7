import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { Spinner, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })

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

  return (
    <div className='container my-3'>
      <h2>Users</h2>
      <Table bordered>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name} &nbsp;</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
