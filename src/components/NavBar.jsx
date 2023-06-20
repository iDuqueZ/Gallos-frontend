import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Button from '@mui/material/Button';

function Nav_Bar() {

    const handleSalir = () => {
        sessionStorage.clear()
        window.location.href="/"
    };

    return(
        <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Batalla de gallos</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="justify-content-end">
                            <Nav.Link href="/inicio">Inicio</Nav.Link>
                            <Nav.Link href="/gallos">Gallos</Nav.Link>
                            <Nav.Link href="/batallas">Batallas</Nav.Link>
                            <Nav.Link href="/resumen">Estadistica</Nav.Link>
                            <Nav.Link><Button
                                        variant="text"
                                        color="error"
                                        size='small'
                                        onClick={() => handleSalir()}
                                    >
                                        Salir
                                    </Button></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default Nav_Bar;