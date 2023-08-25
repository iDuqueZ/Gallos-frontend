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

export default function DenseTable(b) {

  console.log(b);
  const [batallas, setBatallas] = useState([]);
  const [gallosDetalles, setGallosDetalles] = useState([]);

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

  const handleOpenCombate = (batallaId) => {
    sessionStorage.setItem('selectedBatallaId', batallaId);
    window.open('/combate', '_blank');
  };

  const batallasOrdenadas = [...batallas];

  batallasOrdenadas.sort((batallaA, batallaB) => {
    const pesoAzulA = gallosDetalles.find((gallo) => gallo._id === batallaA.peleadorAzul)?.peso;
    const pesoRojoA = gallosDetalles.find((gallo) => gallo._id === batallaA.peleadorRojo)?.peso;

    const pesoAzulB = gallosDetalles.find((gallo) => gallo._id === batallaB.peleadorAzul)?.peso;
    const pesoRojoB = gallosDetalles.find((gallo) => gallo._id === batallaB.peleadorRojo)?.peso;

    // Verificar si los pesos azul y rojo de ambas batallas son iguales
    if (pesoAzulA === pesoRojoA && pesoAzulB === pesoRojoB) {
      return 0; // Mantener el orden original
    }

    // Verificar si la batalla A tiene gallos del mismo peso y la batalla B no
    if (pesoAzulA === pesoRojoA && (pesoAzulB !== pesoRojoB || pesoAzulB === undefined || pesoRojoB === undefined)) {
      return -1; // Mover la batalla A hacia arriba
    }

    // Verificar si la batalla B tiene gallos del mismo peso y la batalla A no
    if ((pesoAzulA !== pesoRojoA || pesoAzulA === undefined || pesoRojoA === undefined) && pesoAzulB === pesoRojoB) {
      return 1; // Mover la batalla B hacia arriba
    }

    // Verificar si ambos gallos azules tienen el mismo peso
    if (pesoAzulA === pesoAzulB) {
      return 0; // Mantener el orden original
    }

    // Verificar si el peso azul de la batalla A es menor al de la batalla B
    if (pesoAzulA < pesoAzulB) {
      return -1; // Mover la batalla A hacia arriba
    }

    // Mover la batalla B hacia arriba
    return 1;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Orden</TableCell>
            <TableCell align="right">Cuerda Azul</TableCell>
            <TableCell align="right">Frente Azul</TableCell>
            <TableCell align="right">Peso Azul</TableCell>
            <TableCell align="right">Anillo Azul</TableCell>
            <TableCell align="right">Cuerda Rojo</TableCell>
            <TableCell align="right">Frente Rojo</TableCell>
            <TableCell align="right">Peso Rojo</TableCell>
            <TableCell align="right">Anillo Rojo</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {batallasOrdenadas.map((batalla, index) => {
            const peleadorAzul = gallosDetalles.find((gallo) => gallo._id === batalla.peleadorAzul);
            const peleadorRojo = gallosDetalles.find((gallo) => gallo._id === batalla.peleadorRojo);

            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell style={{ color: "blue" }} align="left">{peleadorAzul ? peleadorAzul.cuerda : ''}</TableCell>
                <TableCell style={{ color: "blue" }} align="left">{peleadorAzul ? peleadorAzul.frente : ''}</TableCell>
                <TableCell style={{ color: "blue" }} align="left">{peleadorAzul ? peleadorAzul.peso : ''}</TableCell>
                <TableCell style={{ color: "blue" }} align="left">{peleadorAzul ? peleadorAzul.anillo : ''}</TableCell>
                <TableCell style={{ color: "red" }} align="right">{peleadorRojo ? peleadorRojo.cuerda : ''}</TableCell>
                <TableCell style={{ color: "red" }} align="right">{peleadorRojo ? peleadorRojo.frente : ''}</TableCell>
                <TableCell style={{ color: "red" }} align="right">{peleadorRojo ? peleadorRojo.peso : ''}</TableCell>
                <TableCell style={{ color: "red" }} align="right">{peleadorRojo ? peleadorRojo.anillo : ''}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size='small'
                    onClick={() => handleOpenCombate(batalla._id)}
                  >
                    <img src="/lucha.png" alt="Lucha" />
                  </Button>

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
