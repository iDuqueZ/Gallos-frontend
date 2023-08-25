import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ModalGallo from './ModalGallo';
import Noty from 'noty';

export default function GallosList() {
    const [gallos, setGallos] = useState([]);
    const [selectedGalloId, setSelectedGalloId] = useState(null);
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const idUser = sessionStorage.getItem('idUser')
                const response = await axios.get(`/gallo/listartodos/${idUser}`);
                const data = response.data;
                setGallos(data);
            } catch (error) {
                console.error('Error al obtener la lista de gallos:', error);
            }
        };

        fetchData();
    }, []);

    const handleModificar = (id) => {
        setSelectedGalloId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleActualizar = () => {
        const fetchData = async () => {
            try {
                const idUser = sessionStorage.getItem('idUser')
                const response = await axios.get(`/gallo/listartodos/${idUser}`);
                const data = response.data;
                setGallos(data);
            } catch (error) {
                console.error('Error al obtener la lista de gallos:', error);
            }
        };

        new Noty({
            text: 'Lista actualizada',
            timeout: 1500
        }).show();

        fetchData();
    };

    const handleEliminar = async (id) => {
        try {
            const response = await axios.get(`/gallo/eliminar/${id}`);
            const data = response.data;

            new Noty({
                text: data,
                timeout: 1500
            }).show();
        } catch (error) {
            new Noty({
                text: 'Error al eliminar gallo ' + error,
                type: 'error',
                timeout: 1500
            }).show();
        }
    };
    

    const handleImprimir = (id) => {
        const fetchGallo = async () => {
            try {
                const response = await axios.get(`/gallo/listar/${id}`);
                const selectedGallo = response.data;
                const ventanaImpresion = window.open('', '_blank'); // Abre una nueva ventana o pestaña
                const contenidoImpresion = `
                <html>
                <head>
                    <title>Impresión de datos del gallo</title>
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                    }
                
                    h1 {
                        text-align: center;
                    }
                
                    p {
                        margin-bottom: 10px;
                    }
                    </style>
                </head>
                <body>
                    <h1>Datos del gallo:</h1>
                    <p>Cuerda: ${selectedGallo.cuerda}</p>
                    <p>F: ${selectedGallo.frente}</p>
                    <p>Ciudad: ${selectedGallo.ciudad}</p>
                    <p>Color: ${selectedGallo.color}</p>
                    <p>Peso: ${selectedGallo.peso}</p>
                    <p>Jaula: ${selectedGallo.jaula}</p>
                    <p>Tipo: ${selectedGallo.tipo}</p>
                    <p>Placa: ${selectedGallo.placa}</p>
                    <p>Anillo: ${selectedGallo.anillo}</p>
                </body>
                </html>
            `;

                ventanaImpresion.document.write(contenidoImpresion); // Escribe el contenido en la nueva ventana
                ventanaImpresion.document.close(); // Cierra la escritura del documento
                ventanaImpresion.print(); // Imprime la página
            } catch (error) {
                console.error('Error al obtener los datos del gallo:', error);
            }
        };

        fetchGallo();
    };


    return (
        <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Cuerda</b></TableCell>
                            <TableCell align="right"><b>F</b></TableCell>
                            <TableCell align="right"><b>Ciudad</b></TableCell>
                            <TableCell align="right"><b>Color</b></TableCell>
                            <TableCell align="right"><b>Peso</b></TableCell>
                            <TableCell align="right"><b>Jaula</b></TableCell>
                            {/* <TableCell align="right"><b>Marca</b></TableCell> */}
                            <TableCell align="right"><b>Tipo</b></TableCell>
                            <TableCell align="right"><b>Placa</b></TableCell>
                            <TableCell align="right"><b>Anillo</b></TableCell>
                            <TableCell align="right"><Button
                                variant="text"
                                color="secondary"
                                onClick={() => handleActualizar()}
                            >
                                Actualizar
                            </Button></TableCell> {/* Nueva columna de acción */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gallos.map((gallo) => (
                            <TableRow key={gallo.placa}>
                                <TableCell component="th" scope="row">
                                    {gallo.cuerda}
                                </TableCell>
                                <TableCell align="right">{gallo.frente}</TableCell>
                                <TableCell align="right">{gallo.ciudad}</TableCell>
                                <TableCell align="right">{gallo.color}</TableCell>
                                <TableCell align="right">{gallo.peso}</TableCell>
                                <TableCell align="right">{gallo.jaula}</TableCell>
                                {/* <TableCell align="right">{gallo.marca}</TableCell> */}
                                <TableCell align="right">{gallo.tipo}</TableCell>
                                <TableCell align="right">{gallo.placa}</TableCell>
                                <TableCell align="right">{gallo.anillo}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="text"
                                        color="primary"
                                        size='small'
                                        onClick={() => handleModificar(gallo._id)}
                                    >
                                        Modificar
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        size='small'
                                        onClick={() => handleImprimir(gallo._id)}
                                    >
                                        Imprimir
                                    </Button>
                                    <Button
                                        variant="text"
                                        color="error"
                                        size='small'
                                        onClick={() => handleEliminar(gallo._id)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <ModalGallo
                open={openModal}
                onClose={handleCloseModal}
                galloId={selectedGalloId}
            />
        </section>
    );
}
