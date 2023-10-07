import { Link } from 'react-router-dom'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'

const Navigation = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="md" className="bg-primary">
      <Container>
        <Navbar.Brand href="#" className="text-white fw-bold">
          BLOG APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link to={'/'} className="text-white text-decoration-none m-3 ">
                Blogs
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={'/users'} className="text-white text-decoration-none">
                Users
              </Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <div className="text-white">
              {user.name} logged in{' '}
              <Button onClick={handleLogout} variant="danger">
                logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export const LoginNav = () => (
  <Navbar collapseOnSelect expand="md" className="bg-primary">
    <Container>
      <Navbar.Brand href="#" className="text-white fw-bold">
        BLOG APP
      </Navbar.Brand>
    </Container>
  </Navbar>
)

export default Navigation
