import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './TopNavbar.module.css'


const TopNavbar= () => {
    return (
        <>
        <Navbar style={{backgroundColor: 'rgba(19,22,38)' ,color:'red'}} >
            <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Quiz</Nav.Link>  
                <Nav.Link href="#features">Ranking</Nav.Link>
                <Nav.Link href="#pricing">Login</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;