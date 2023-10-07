import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Navigation, { LoginNav } from './components/Navigation'
import BlogList from './components/BlogList'

import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import { useContext } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Spinner } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET_USER',
        payload: loggedUser,
      })
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      userDispatch({
        type: 'SET_USER',
        payload: loggedUser,
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: exception.response.data.error,
          type: 'error',
        },
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    userDispatch({ type: 'CLEAR_USER' })
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <div>
        <LoginNav />
        <Notification
          message={notification.message}
          notificationType={notification.type}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </div>
    )
  }

  if (result.isLoading) {
    return (
      <Router>
        <Navigation user={user} handleLogout={handleLogout} />
        <div className="container w-100 d-flex flex-column mt-5 align-items-center justify-content-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Router>
    )
  }

  const blogs = result.data
  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes).reverse()

  return (
    <Router>
      <div>
        <Navigation user={user} handleLogout={handleLogout} />
        <Notification
          message={notification.message}
          notificationType={notification.type}
        />

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog blogs={blogs} user={user} queryClient={queryClient} />
            }
          />
          <Route path="/" element={<BlogList sortedBlogs={sortedBlogs} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
