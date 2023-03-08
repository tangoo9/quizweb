import { useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../firebaseConfig';



const TopNavbar= ({isLoggedIn, user}) => {
    // <Link to="/Quiz">quiz</Link>
    const navigate = useNavigate()
    const onLogOut = ()=>{  
        authService.signOut();
        navigate('/', {replace : true})
    }

    return (
        <>
        <Navbar className='navbar' >
            <Container>
                <Navbar.Brand className="me-5" as={Link} to="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link className="me-5" as={Link} to="/Quiz">Quiz</Nav.Link>
                    <Nav.Link className="me-5" as={Link} to="/Ranking">Ranking</Nav.Link>
                        {isLoggedIn &&(
                            <Nav.Link className="me-5" as={Link} to="/AddQuiz">AddQuiz</Nav.Link>
                        )}
                </Nav>
                        {isLoggedIn &&(
                            <>
                                <Nav.Item className="ms-auto">
                                    <span className='me-5'>{user.displayName}님 좋은 하루 되세요.</span>
                                    </Nav.Item>
                                <Button className="ml-3" type="button"onClick={onLogOut}>Log Out</Button>
                            </>
                        )}
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;