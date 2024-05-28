import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../imagens/logo.png';
import './navbar.css'; 

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    if (user) {
      setUsername(JSON.parse(user).username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt='Logo Vayon' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 custom-nav" navbarScroll>

            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/criacaoCotacao" className="nav-link">Criação de Cotação</Nav.Link>
                <Nav.Link as={Link} to="/listaCotacao" className="nav-link">Lista De Cotação</Nav.Link>
                <Nav.Link as={Link} to="/listaApolice" className="nav-link">Lista de Apólice</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {isAuthenticated ? (
              <NavDropdown title={username} id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item onClick={handleLogout} className="dropdown-link">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className='nav-login'>Log In</Nav.Link>
                <Nav.Link as={Link} to="/singup" className='nav-singup'>Sing Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
