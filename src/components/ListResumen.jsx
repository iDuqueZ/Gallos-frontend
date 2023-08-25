import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GallosTable = () => {
  const [gallos, setGallos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = sessionStorage.getItem('idUser');
        const response = await axios.get(`/gallo/listartodos/${idUser}`);
        const gallosData = {};

        response.data.forEach((gallo) => {
          const key = `${gallo.cuerda} ${gallo.frente}`;
          if (!gallosData[key]) {
            gallosData[key] = {
              puntos: 0,
              ganadas: 0,
              tablas: 0,
              perdidas: 0,
              tiempo: [],
            };
          }

          gallosData[key].puntos += (gallo.ganadas || 0) * 3 + (gallo.tablas || 0);
          gallosData[key].ganadas += gallo.ganadas || 0;
          gallosData[key].tablas += gallo.tablas || 0;
          gallosData[key].perdidas += gallo.perdidas || 0;
          gallosData[key].tiempo.push(...gallo.tiempo);
        });

        const gallosFormatted = Object.keys(gallosData).map((key) => {
          const gallo = gallosData[key];
          return {
            cuerdaFrente: key,
            puntos: gallo.puntos,
            ganadas: gallo.ganadas,
            tablas: gallo.tablas,
            perdidas: gallo.perdidas,
            tiempoPromedio: calcularTiempoPromedio(gallo.tiempo),
            totalTiempo: calcularTiempoTotal(gallo.tiempo),
          };
        });

        // Ordenar los gallos por cantidad de puntos (en orden descendente)
        gallosFormatted.sort((a, b) => b.puntos - a.puntos);

        setGallos(gallosFormatted);
      } catch (error) {
        console.error('Error al obtener los datos de los gallos', error);
      }
    };

    fetchData();
  }, []);

  const calcularTiempoPromedio = (tiempo) => {
    if (tiempo.length > 0) {
      const sumaTiempos = tiempo.reduce((total, t) => total + t, 0);
      const tiempoPromedio = sumaTiempos / tiempo.length;
      return tiempoPromedio;
    }

    return 0;
  };

  const calcularTiempoTotal = (tiempo) => {
    if (tiempo.length > 0) {
      const tiempoTotal = tiempo.reduce((total, t) => total + t, 0);
      return tiempoTotal;
    }

    return 0;
  };

  const formatTiempo = (tiempo) => {
    const minutes = Math.floor(tiempo / 60);
    const seconds = tiempo % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Cuerda + F</TableCell>
            <TableCell>Puntos</TableCell>
            <TableCell>Cant Ganadas</TableCell>
            <TableCell>Cant Tablas</TableCell>
            <TableCell>Cant Perdidas</TableCell>
            <TableCell>T promedio</TableCell>
            <TableCell>Total Tiempo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gallos.map((gallo) => (
            <TableRow key={gallo.cuerdaFrente}>
              <TableCell>{gallo.cuerdaFrente}</TableCell>
              <TableCell>{gallo.puntos}</TableCell>
              <TableCell>{gallo.ganadas}</TableCell>
              <TableCell>{gallo.tablas}</TableCell>
              <TableCell>{gallo.perdidas}</TableCell>
              <TableCell>{formatTiempo(gallo.tiempoPromedio)}</TableCell>
              <TableCell>{formatTiempo(gallo.totalTiempo)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GallosTable;
