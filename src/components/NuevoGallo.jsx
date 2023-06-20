import Container from 'react-bootstrap/esm/Container';
import React, { useState } from 'react';
import NavBar from './NavBar';
import { TextField } from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';
import Noty from 'noty';

export default function Nuevo_Gallo() {

    const idUser = sessionStorage.getItem('idUser')
    const [formData, setFormData] = useState({
        cuerda: '',
        frente: '',
        ciudad: '',
        color: '',
        peso: '',
        jaula: '',
        marca: '',
        tipo: '',
        placa: '',
        anillo: '',
        adminId: idUser
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const onClose = () => {
        // Lógica para cerrar el componente o redirigir a otra página
        window.location.href = "/gallos"
    };

    const handleGuardar = () => {
        // Lógica para enviar la petición y guardar los datos del gallo
        // Utiliza la librería Axios u otra similar para realizar la petición POST

        // Ejemplo utilizando Axios
        const token = sessionStorage.getItem('token');
        console.log(formData)
        axios.post(`/gallo/nuevo`, formData, {
            headers: { 'autorizacion': token }
        })
            .then(response => {
                // Manejo de la respuesta de la petición
                console.log(response.data);
                new Noty({
                    type: 'success',
                    text: "Gallo registrado con éxito",
                    timeout: 1500
                }).show();
            })
            .catch(error => {
                // Manejo de errores
                console.error(error);
                new Noty({
                    type: 'error',
                    text: "Hubo un error verifica los campos",
                    timeout: 1500
                }).show();
            });
    };

    const handleLimpiar = () => {
        setFormData({
            cuerda: '',
            frente: '',
            ciudad: '',
            color: '',
            peso: '',
            jaula: '',
            marca: '',
            tipo: '',
            placa: '',
            anillo: '',
            adminId: idUser
        });
    };

    return (
        <section>
            <NavBar></NavBar>

            <Container style={{ marginTop: "40px" }}>
                <h1>Registro de Gallo</h1>
                <hr></hr>
                <div>
                    <form>
                        <div style={{ display: 'grid', gridTemplateColumns: "repeat(2, 1fr)", columnGap: "10px", rowGap: "20px" }}>
                            <TextField
                                label="Cuerda"
                                name="cuerda"
                                value={formData.cuerda}
                                onChange={handleChange}
                            />
                            {/* Resto de los campos del formulario */}
                            <TextField
                                label="Frente"
                                name="frente"
                                type='number'
                                value={formData.frente}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Ciudad"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Peso"
                                name="peso"
                                type='number'
                                value={formData.peso}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Jaula"
                                name="jaula"
                                type='number'
                                value={formData.jaula}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Marca"
                                name="marca"
                                type='number'
                                value={formData.marca}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Tipo"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Placa"
                                name="placa"
                                type='number'
                                value={formData.placa}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Anillo"
                                name="anillo"
                                type='number'
                                value={formData.anillo}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Admin"
                                name="adminId"
                                hidden= "true"
                                value={sessionStorage.getItem('idUser')}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                            <Button style={{ margin: "5px" }} variant="outlined" color="error" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button style={{ margin: "5px" }} variant="contained" color="secondary" onClick={handleLimpiar}>
                                Limpiar
                            </Button>
                            <Button style={{ margin: "5px" }} variant="contained" color="primary" onClick={handleGuardar}>
                                Guardar
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    )
}
