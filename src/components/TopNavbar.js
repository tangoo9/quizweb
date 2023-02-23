import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './TopNavbar.module.css'


const TopNavbar= () => {
    return (
        <>
        <Navbar style={{backgroundColor: 'rgba(222,222,222)' ,color:'red'}} >
            <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/Quiz">Quiz</Nav.Link>  
                <Nav.Link href="/Ranking">Ranking</Nav.Link>
                <Nav.Link href="/Login">Login</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default TopNavbar;