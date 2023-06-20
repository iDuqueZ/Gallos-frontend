import React, { useEffect, useState} from 'react';
import Container from 'react-bootstrap/esm/Container';
import NavBar from './NavBar';
import ListGallos from './ListGallos'
import Button from '@mui/material/Button';
import axios from 'axios';

function Gallos() {

    const [gallos, setGallos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idUser = sessionStorage.getItem('idUser')
                const response = await axios.get(`/gallo/listartodos/${idUser}`);
                const data = response.data;
                console.log(response);
                setGallos(data);
            } catch (error) {
                console.error('Error al obtener la lista de gallos:', error);
            }
        };

        fetchData();
    }, []);


    const handleImprimir = () => {
        const ventanaImpresion = window.open('', '_blank'); // Abre una nueva ventana o pestaña
        const contenidoImpresion = `
            <html>
            <head>
                <title>Impresión de la lista de gallos</title>
                <style>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }
            
                h1 {
                    text-align: center;
                }
            
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
            
                th,
                td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
            
                th {
                    background-color: #f2f2f2;
                }
            </style>
            
                </style>
            </head>
            <body>
                <h1>Listado de Gallos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Cuerda</th>
                            <th>Frente</th>
                            <th>Ciudad</th>
                            <th>Color</th>
                            <th>Peso</th>
                            <th>Jaula</th>
                            <th>Tipo</th>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Anillo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gallos.map(gallo => `
                            <tr>
                                <td>${gallo.cuerda}</td>
                                <td>${gallo.frente}</td>
                                <td>${gallo.ciudad}</td>
                                <td>${gallo.color}</td>
                                <td>${gallo.peso}</td>
                                <td>${gallo.jaula}</td>
                                <td>${gallo.tipo}</td>
                                <td>${gallo.placa}</td>
                                <td>${gallo.marca}</td>
                                <td>${gallo.anillo}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
    
        ventanaImpresion.document.write(contenidoImpresion); // Escribe el contenido en la nueva ventana
        ventanaImpresion.document.close(); // Cierra la escritura del documento
        ventanaImpresion.print(); // Imprime la página
    };
    

    return (
        <section>
            <NavBar></NavBar>

            <Container style={{ marginTop: "40px" }}>
                <h1>Listado de Gallos</h1>
                <hr></hr>

                <ListGallos></ListGallos>

                <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                    <Button style={{margin: "5px"}}
                        variant="outlined"
                        color="secondary"
                        size='small'
                        onClick={() => handleImprimir()}
                    >
                        Imprimir
                    </Button>
                    <Button style={{margin: "5px"}}
                        variant="outlined"
                        color="primary"
                        size='small'
                        onClick={() => window.location.href = '/nuevogallo'}
                    >
                        Agregar nuevo Gallo
                    </Button>
                </div>
            </Container>
        </section>

    )
}

export default Gallos;