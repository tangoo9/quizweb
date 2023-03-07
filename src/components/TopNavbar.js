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
        <Navbar style={{backgroundColor: 'rgba(222,222,222)' , color:'red'}} >
            <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Quiz">Quiz</Nav.Link>
                    <Nav.Link as={Link} to="/Ranking">Ranking</Nav.Link>
                        {isLoggedIn &&(
                            <Nav.Link as={Link} to="/AddQuiz">AddQuiz</Nav.Link>
                        )}
                </Nav>
                        {isLoggedIn &&(
                            <>
                                <Nav.Item className="ms-auto">{user.displayName}님 안녕하세요.</Nav.Item>
                                <Button className="ml-3" type="button"onClick={onLogOut}>Log Out</Button>
                            </>
                        )}
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;