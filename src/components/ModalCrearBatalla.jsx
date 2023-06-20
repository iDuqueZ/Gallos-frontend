import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Noty from 'noty';

const CrearBatallaModal = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        cuerdaAzul: '',
        frenteAzul: '',
        anilloAzul: '',
        cuerdaRojo: '',
        frenteRojo: '',
        anilloRojo: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGuardar = async () => {
        try {
            const idUser = sessionStorage.getItem('idUser');
            const response = await axios.post(`/batalla/crear/${idUser}`, formData);
            const data = response.data;

            if (response.status === 200) {
                // Batalla creada exitosamente
                console.log('Batalla creada:', data.respuesta);
                onClose();

                // Notificación
                new Noty({
                    type: 'success',
                    text: data.mensaje,
                    timeout: 1500
                }).show();
            } else {
                // Error al crear la batalla
                console.error('Error al crear la batalla:', data.mensaje);

                // Notificación de error
                new Noty({
                    type: 'error',
                    text: data.mensaje,
                    layout: 'bottomLeft',
                    timeout: 1500
                }).show();
            }
        } catch (error) {
            console.error('Error al crear la batalla:', error);

            // Notificación de error
            new Noty({
                type: 'error',
                text: 'Error al crear la batalla',
                layout: 'bottomLeft',
                timeout: 1500
            }).show();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 600,
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 4,
                    borderRadius: '10px'
                }}
            >
                <div>
                    <h2>Crear Batalla</h2>

                    <form style={{ display: 'grid', gap: '20px' }}>

                        <div>
                            <label style={{ color: "blue" }}>Peleador Azul:</label>
                            <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)", columnGap: "10px", rowGap: "20px" }}>
                                <TextField
                                    style={{ gridColumn: "1 / 3", gridRow: "1" }}
                                    label="Cuerda"
                                    name="cuerdaAzul"
                                    value={formData.cuerdaAzul}
                                    onChange={handleChange}
                                />
                                <TextField
                                    style={{ gridColumn: "3 / 4", gridRow: "1" }}
                                    label="Frente"
                                    name="frenteAzul"
                                    type='number'
                                    value={formData.frenteAzul}
                                    onChange={handleChange}
                                />
                                <TextField
                                    style={{ gridColumn: "4 / 4", gridRow: "1" }}
                                    label="Anillo"
                                    name="anilloAzul"
                                    type='number'
                                    value={formData.anilloAzul}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ color: "red" }}>Peleador Rojo:</label>
                            <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)", columnGap: "10px", rowGap: "20px" }}>
                                <TextField
                                    style={{ gridColumn: "1 / 3", gridRow: "1" }}
                                    label="Cuerda Gallo Rojo"
                                    name="cuerdaRojo"
                                    value={formData.cuerdaRojo}
                                    onChange={handleChange}
                                />
                                <TextField
                                    style={{ gridColumn: "3 / 4", gridRow: "1" }}
                                    label="Frente Gallo Rojo"
                                    name="frenteRojo"
                                    type='number'
                                    value={formData.frenteRojo}
                                    onChange={handleChange}
                                />
                                <TextField
                                    style={{ gridColumn: "4 / 4", gridRow: "1" }}
                                    label="Anillo"
                                    name="anilloRojo"
                                    type='number'
                                    value={formData.anilloRojo}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>


                        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                            <Button style={{ marginRight: "10px" }} variant="outlined" color="secondary" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleGuardar}>
                                Guardar
                            </Button>
                        </div>

                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default CrearBatallaModal;
