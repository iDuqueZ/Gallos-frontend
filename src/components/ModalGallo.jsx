import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Noty from 'noty';

const ModificarGalloModal = ({ open, onClose, galloId }) => {
    const [gallo, setGallo] = useState({});
    const [formData, setFormData] = useState({
        cuerda: '',
        frente: 0,
        ciudad: '',
        color: '',
        peso: 0,
        jaula: 0,
        marca: 0,
        tipo: '',
        placa: 0,
        anillo: 0,
    });

    useEffect(() => {
        const fetchGallo = async () => {
            try {
                const response = await axios.get(`/gallo/listar/${galloId}`);
                const data = response.data;
                setGallo(data);
                setFormData(data);
            } catch (error) {
                console.error('Error al obtener los datos del gallo:', error);
            }
        };

        fetchGallo();
    }, [galloId]);

    console.log(gallo)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }; 

    const handleGuardar = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.put(`/gallo/actualizar/${galloId}`, formData, {
                headers: { 'autorizacion': token }
            });
            console.log('Gallo actualizado:', response.data);
            onClose();

            // Notificación
            new Noty({
                type: 'success',
                text: 'Gallo actualizado',
                timeout: 1500
              }).show();

        } catch (error) {
            console.error('Error al actualizar el gallo:', error);
        }
    };

    return (

        <Modal open={open} onClose={onClose}>
            <Box sx={{
                width: 800,
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 4,
                borderRadius: '10px'
            }}>
                <div>
                    <h2 style={{marginBottom: "20px"}}>Modificar Gallo</h2>
                    <form style={{ display: 'grid', gridTemplateColumns: "repeat(2, 1fr)", columnGap: "10px", rowGap: "20px" }}>
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

                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleGuardar}>
                            Guardar
                        </Button>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};


export default ModificarGalloModal;
