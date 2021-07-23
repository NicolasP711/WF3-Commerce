import { Fragment } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'

const Header = ({ user, basket }) => {
  const history = useHistory()
  return (
    <Navbar bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          WF3-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            {user && user.admin && (
            <Nav.Link as={Link} to='/admin' className='me-5'>
              <i className='fas fa-user me-1'></i> Admin
            </Nav.Link>
            )}
            {!user ? (
              <Nav.Link as={Link} to='/login'>
                Se connecter
              </Nav.Link>
            ) : (
              <Fragment>
                <Nav.Link as={Link} to='/basket' className='me-5'><i className="fas fa-shopping-basket me-1"></i>Panier{basket.length}</Nav.Link>
                <Nav.Link>Bonjour {user.firstname + ' ' + user.lastname}</Nav.Link>
                <Nav.Link onClick={() => {
                  auth.signOut()
                  history.push('/')
                }}>
                  Se déconnecter
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
