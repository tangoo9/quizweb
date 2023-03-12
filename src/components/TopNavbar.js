import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../firebaseConfig';



const TopNavbar= ({isLoggedIn, user}) => {
    // <Link to="/Quiz">quiz</Link>
    const navigate = useNavigate()
    const onLogOut = ()=>{  
        authService.signOut();
        navigate('/', {replace : true})
    }

    const location = useLocation();


    return (
        <>
        <Navbar className='navbar' >
            <Container>
                <Nav.Link 
                    className={`${location.pathname ==='/' ? 'active' : ''} me-3 me-sm-5`}as={Link} to="/">Home</Nav.Link>
                <Nav.Link 
                    className={`${location.pathname ==='/Quiz' ? 'active' : ''} me-3 me-sm-5`} as={Link} to="/Quiz">Quiz</Nav.Link>
                {/* <Nav.Link 
                    className={`${location.pathname ==='/Ranking' ? 'active' : ''} me-3 me-sm-5`} as={Link} to="/Ranking">Ranking</Nav.Link> */}
            {isLoggedIn 
            ? 
            (<>
                <Nav.Link 
                    className={`${location.pathname ==='/AddQuiz' ? 'active' : ''} me-3 me-sm-5`} as={Link} to="/AddQuiz">AddQuiz</Nav.Link>
                <Nav.Item className="ms-auto">
                    <span className='welcome-text me-3 me-sm-5'>{user.displayName}님 좋은 하루 되세요!</span>
                </Nav.Item>
                <Button type="button" className='gradient-custom-2' onClick={onLogOut}>
                    <span className='log-out-Btn'>Log Out</span>
                    <span className='log-out-icon'><FontAwesomeIcon icon={faSignOutAlt} /></span> 
                </Button>
            </>
            )
            : <Nav.Item className="me-auto"></Nav.Item>
            }
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;