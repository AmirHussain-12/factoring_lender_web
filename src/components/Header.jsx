import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../app/auth/AuthContext'
import { NAVBAR_TABS } from '../global/constants'
import { renderNavBarTabs } from '../global/helpers'

const Header = () => {
  const { currentUser } = useAuth()
  const tabs = NAVBAR_TABS[currentUser?.role_type] || []
  const { logout } = useAuth()
  return (
    <>
      <Navbar expand='md' bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Factoring Lender App</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="me-auto">
              {renderNavBarTabs(tabs).concat(
                <LinkContainer key='login' to='/login'>
                  <Button>Login</Button>
                </LinkContainer>,
                <LinkContainer key='logout' to='/login'>
                  <Button variant='danger' onClick={()=>logout()}>Logout</Button>
                </LinkContainer>,
                currentUser && <Button variant='secondary'>{currentUser?.name}</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header