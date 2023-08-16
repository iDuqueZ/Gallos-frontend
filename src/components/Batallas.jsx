import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import NavBar from './NavBar';
import ListBatallas from './ListBatallas';
import ModalCrearBatalla from './ModalCrearBatalla'
import Button from '@mui/material/Button';
import axios from 'axios';
import Noty from 'noty';
import TextField from '@mui/material/TextField';

export default function Batallas() {

  const [batallas, setBatallas] = useState([]);
  const [gallosDetalles, setGallosDetalles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [margenPeso, setMargenPeso] = useState(0); // Valor inicial puede ser 0


  useEffect(() => {
    const fetchBatallas = async () => {
      try {
        const idUser = sessionStorage.getItem('idUser');
        const response = await axios.get(`/batalla/listar/${idUser}`);
        setBatallas(response.data);
      } catch (error) {
        console.error('Error al obtener las batallas:', error);
      }
    };

    fetchBatallas();
  }, []);

  useEffect(() => {
    const fetchGallosDetalles = async () => {
      try {
        const galloIds = batallas.map((batalla) => [
          batalla.peleadorAzul,
          batalla.peleadorRojo,
        ]);

        const promises = galloIds.flat().map((galloId) =>
          axios.get(`/gallo/listar/${galloId}`)
        );

        const responses = await Promise.all(promises);
        const gallos = responses.map((response) => response.data);
        setGallosDetalles(gallos);
      } catch (error) {
        console.error('Error al obtener los detalles de los gallos:', error);
      }
    };

    fetchGallosDetalles();
  }, [batallas]);



  const handleImprimir = () => {
    const ventanaImpresion = window.open('', '_blank');
    const contenidoImpresion = `
      <html>
        <head>
          <title>Impresión de la lista de batallas</title>
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
        </head>
        <body>
          <h1>Listado de Batallas</h1>
          <table>
            <thead>
              <tr>
                <th>Orden</th>
                <th>Cuerda Azul</th>
                <th>Frente Azul</th>
                <th>Peso Azul</th>
                <th>Anillo Azul</th>
                <th>Cuerda Rojo</th>
                <th>Frente Rojo</th>
                <th>Peso Rojo</th>
                <th>Anillo Rojo</th>
              </tr>
            </thead>
            <tbody>
              ${batallas.map((batalla, index) => {
      const peleadorAzul = gallosDetalles.find((gallo) => gallo._id === batalla.peleadorAzul);
      const peleadorRojo = gallosDetalles.find((gallo) => gallo._id === batalla.peleadorRojo);

      return (
        `<tr>
                    <td>${index + 1}</td>
                    <td>${peleadorAzul ? peleadorAzul.cuerda : ''}</td>
                    <td>${peleadorAzul ? peleadorAzul.frente : ''}</td>
                    <td>${peleadorAzul ? peleadorAzul.peso : ''}</td>
                    <td>${peleadorAzul ? peleadorAzul.anillo : ''}</td>
                    <td>${peleadorRojo ? peleadorRojo.cuerda : ''}</td>
                    <td>${peleadorRojo ? peleadorRojo.frente : ''}</td>
                    <td>${peleadorRojo ? peleadorRojo.peso : ''}</td>
                    <td>${peleadorRojo ? peleadorRojo.anillo : ''}</td>
                  </tr>`
      );
    }).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    ventanaImpresion.document.write(contenidoImpresion);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerar(); // Llama a la función de generación de batallas
  };

  const handleGenerar = async () => {
    try {
      const idUser = sessionStorage.getItem('idUser');
      const res = await axios.post(`/batalla/crearauto/${idUser}`, {
        margenPeso: parseFloat(margenPeso), // Usar parseFloat en lugar de parseInt
      });
      console.log(res);

      new Noty({
        type: 'success',
        text: 'Batallas generadas automáticamente',
        layout: 'bottomLeft',
        timeout: 2500,
      }).show();

      setTimeout(() => {
        window.location.reload(); // Recargar la página después de 1500ms
      }, 2500);
    } catch (error) {
      console.error('Error al generar las batallas al dar clic:', error);
    }
  };



  const handleBorrar = async () => {

    try {
      const idUser = sessionStorage.getItem('idUser');
      const res = await axios.delete(`/batalla/eliminar/${idUser}`);

      new Noty({
        type: 'success',
        text: res.data.mensaje,
        layout: 'bottomLeft',
        timeout: 1500
      }).show();

      setTimeout(() => {
        window.location.reload(); // Recargar la página después de 1500ms
      }, 1500);

    } catch (error) {
      new Noty({
        type: 'error',
        text: 'Uy! hubo un error',
        layout: 'bottomLeft',
        timeout: 1500
      }).show();
    }
  };



  const handleCancelarBatalla = () => {
    // Cierra el modal sin hacer nada
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  }

  return (
    <section>
      <NavBar />
      <Container style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Listado de Batallas</h1>

          <div style={{display: 'flex'}}>
            <Button style={{ marginRight: "10px" }} variant="outlined" color="warning" size="small" onClick={() => handleBorrar()}>
              Borrar batallas
            </Button>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
              <TextField
                size='small'
                label="Margen peso"
                value={margenPeso}
                onChange={(e) => setMargenPeso(e.target.value)}
                placeholder="Margen de peso"
                style={{ marginBottom: '10px' }}
              />
              <Button type="submit" variant="outlined" color="success" size="small">
                Generar
              </Button>
            </form>
          </div>

        </div>
        <hr></hr>
        {console.log(batallas)}
        <ListBatallas b={batallas} />
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            style={{ margin: '5px' }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleImprimir()}
          >
            Imprimir
          </Button>

          {/* Agrega el botón para abrir el modal */}
          <Button style={{ margin: '5px' }} variant="outlined" color="primary" size="small" onClick={() => openModal()}>
            Crear Batalla
          </Button>
          {/* Renderiza el modal si showModal es true */}
          <ModalCrearBatalla
            open={showModal}
            onClose={handleCancelarBatalla}
          />
        </div>
      </Container>
    </section>
  );
}
