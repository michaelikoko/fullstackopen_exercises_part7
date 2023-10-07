import { useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { Navigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blogs, user, queryClient }) => {
  const id = useParams().id

  const blog = blogs.find((b) => b.id === id)

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const likeBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const likeBlog = () => {
    const blogToBeChanged = blogs.find((b) => b.id === blog.id)
    const changedBlog = {
      ...blogToBeChanged,
      likes: blogToBeChanged.likes + 1,
      user: blogToBeChanged.user.id,
    }
    likeBlogMutation.mutate(changedBlog)
  }

  const deleteBlog = () => {
    const blogToBeDeleted = blogs.find((b) => b.id === blog.id)
    if (
      window.confirm(
        `Remove blog ${blogToBeDeleted.title}! by ${blogToBeDeleted.author}`
      )
    ) {
      deleteBlogMutation.mutate(blogToBeDeleted.id)
    }
  }

  const commentMutation = useMutation(blogService.comment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target[0].value
    commentMutation.mutate({ id: blog.id, comment })
    event.target[0].value = ''
  }

  if (!blog) return <Navigate replace to={'/'} />

  return (
    <div className="container d-flex flex-column jusify-content-center align-items-start my-4">
      <div>
        <h2 className="">{blog.title}</h2>
        <div className="link-primary">{blog.url}</div>
        <div>
          <span className="me-2">{blog.likes} likes</span>
          <Button onClick={likeBlog} variant="success" size="sm">
            like
          </Button>
        </div>
        <div>
          added by <span className="fw-bold">{blog.user.name}</span>
        </div>
        <div>
          {blog.user.username === user.username && (
            <Button onClick={deleteBlog} variant="outline-danger" size="sm">
              remove
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <div className='fw-bold'>comments</div>
        <Form onSubmit={addComment}>
          <Form.Control as="textarea" rows={5}  name="comment" />
          <Button type="submit" variant="primary" size="sm" className='mt-2'>
            add comment
          </Button>
        </Form>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
}
export default Blog
