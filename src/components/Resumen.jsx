import NavBar from "./NavBar"
import Container from "react-bootstrap/esm/Container"
import ListResumen from "./ListResumen"

export default function Resumen() {
    return (
        <section>
            <NavBar />
            <Container style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0px'}}>
                    <h1 style={{marginBottom: '0px'}}>Resumen de las Batallas</h1>
                </div>
                <hr></hr>

                <ListResumen/>
            </Container>

            
        </section>
    )
}
