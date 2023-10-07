import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import { Button, Form } from 'react-bootstrap'

const AddBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `a new blog ${newBlog.title} by ${newBlog.author}`,
          type: 'success',
        },
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
  })

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    newBlogMutation.mutate(blogObject)
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div className="d-flex flex-column jusitify-content-center align-items-start">
      <div className="fw-bold fs-3 mb-2">create new</div>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-1">
          <Form.Label>
            Title
            <Form.Control
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Input title"
              id="title"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>
            Author
            <Form.Control
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
              placeholder="Input author"
              id="author"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>
            URL
            <Form.Control
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
              placeholder="Input url"
              id="url"
            />
          </Form.Label>
        </Form.Group>

        <Button type="submit" variant="info">
          create
        </Button>
      </Form>
    </div>
  )
}

export default AddBlogForm
