import { useNavigate } from 'react-router-dom'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import { Badge, ListGroup } from 'react-bootstrap'

const BlogList = ({ sortedBlogs }) => {
  const navigate = useNavigate()

  return (
    <div className="container my-4 h-100">
      <div className="row">
        <div className="col-md-6 col-12">
          <Togglable buttonLabel="create new blog">
            <AddBlogForm />
          </Togglable>
        </div>

        <div className="col-md-6 col-12">
          <ListGroup variant="flush">
            {sortedBlogs.map((blog) => (
              <ListGroup.Item
                key={blog.id}
                action
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="text-dark d-flex justify-content-between align-items-start"
              >
                <div>{blog.title}</div>
                <Badge bg="info" pill>
                  {blog.likes}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  )
}

export default BlogList
