import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import NavBar from './NavBar';


function Login() {
    return (
        <section>
            <NavBar></NavBar>

            <Container style={{ display: "flex", marginTop: "40px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h1>Bienvenido a batalla de gallos</h1>
                    <p>Nuestro aplicativo te ofrece la emoción y la adrenalina de las apasionantes peleas de gallos desde la comodidad de tu dispositivo. Aquí podrás explorar y seguir las batallas entre los gallos más valientes y poderosos.</p>
                </div>
                <div>
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQlL7wcdq7uJp6CMqM8HzMfXGqQZwdhCP60qZ3CmEhX-aJmQL3A" alt="Gallo-pelea" />
                </div>
            </Container>

            <Container style={{ marginTop: "40px" }}>
                <CardGroup>
                    <Card>
                        <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <Card.Title>Registrar los Gallos</Card.Title>
                            <Card.Text>
                                Registra los gallos de cada cuerda, cada uno con su nombre, ciudad de origen, color, peso y características únicas.
                            </Card.Text>
                            <Button href='/gallos'>1. Ir a Gallos</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <Card.Title>Generar Batallas</Card.Title>
                            <Card.Text>
                                Genera de forma automatica y aleatoria las batallas según el peso de los gallos registrados.
                            </Card.Text>
                            <Button href='/batallas' variant="warning">2. Ir a Batallas</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <Card.Title>Consultar Resultados</Card.Title>
                            <Card.Text>
                                Puedes consultar la tabla de calificaciones y los resultados finales de las batallas.
                            </Card.Text>
                            <Button href='/resumen' variant='success'>3. Ver resultados</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>

        </section>
    );
}

export default Login;