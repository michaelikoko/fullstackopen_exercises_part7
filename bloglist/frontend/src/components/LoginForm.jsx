import { Button, Form } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center container">
      <Form onSubmit={handleLogin} className="my-5">
        <h5>LOGIN</h5>
        <Form.Group>
          <Form.Label>
            username
            <Form.Control
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              autoComplete='username'
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            password
            <Form.Control
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Button
          variant="primary"
          className="mt-2 w-100"
          size="md"
          type="submit"
          id="login-button"
        >
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
