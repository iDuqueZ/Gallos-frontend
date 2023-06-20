import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Noty from 'noty';

export default function Combate() {
  const [cronometroActivo, setCronometroActivo] = useState(false);
  const [cronometroPausado, setCronometroPausado] = useState(false);
  const [cronometroTiempo, setCronometroTiempo] = useState(0);
  const cronometroRef = useRef(null);
  const [temporizadorAzulActivo, setTemporizadorAzulActivo] = useState(false);
  const [temporizadorRojoActivo, setTemporizadorRojoActivo] = useState(false);
  const [temporizadorAzulTiempo, setTemporizadorAzulTiempo] = useState(60);
  const [temporizadorRojoTiempo, setTemporizadorRojoTiempo] = useState(60);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(false);


  const [batalla, setBatalla] = useState({});
  const [gallosDetalle, setGallosDetalle] = useState({});

  useEffect(() => {
    const fetchBatalla = async () => {
      try {
        const batallaId = sessionStorage.getItem('selectedBatallaId');
        const response = await axios.get(`/batalla/listarbatalla/${batallaId}`);
        setBatalla(response.data);

        console.log(response.data.ganador)
        if(response.data.ganador !== null){
          new Noty({
            type: 'information',
            layout: 'center',
            text: 'Esta batalla ya terminó',
            timeout: 2500
          }).show();
        }

      } catch (error) {
        console.error('Error al obtener la batalla:', error);
      }
    };

    fetchBatalla();
  }, []);

  useEffect(() => {
    const fetchGallosDetalles = async () => {
      try {
        const galloIds = [
          batalla.peleadorAzul,
          batalla.peleadorRojo,
        ];

        const promises = galloIds.map((galloId) =>
          axios.get(`/gallo/listar/${galloId}`)
        );

        const responses = await Promise.all(promises);
        const gallos = responses.map((response) => response.data);
        setGallosDetalle(gallos);
      } catch (error) {
        console.error('Error al obtener los detalles de los gallos:', error);
      }
    };

    if (batalla && batalla.peleadorAzul && batalla.peleadorRojo) {
      fetchGallosDetalles();
    }
  }, [batalla]);

  const [peleadorAzul, setPeleadorAzul] = useState({});
  const [peleadorRojo, setPeleadorRojo] = useState({});

  useEffect(() => {
    const fetchPeleadores = async () => {
      try {
        const galloAzul = gallosDetalle.find((gallo) => gallo._id === batalla.peleadorAzul);
        const galloRojo = gallosDetalle.find((gallo) => gallo._id === batalla.peleadorRojo);
        setPeleadorAzul(galloAzul);
        setPeleadorRojo(galloRojo);
      } catch (error) {
        console.error('Error al obtener los detalles de los gallos:', error);
      }
    };

    fetchPeleadores();
  }, [batalla, gallosDetalle]);


  const handleStartCronometro = () => {
    setCronometroActivo(true);
    setCronometroPausado(false);
    setCronometroTiempo(0);
    cronometroRef.current = setInterval(() => {
      setCronometroTiempo((prevTime) => prevTime + 1);
    }, 1000);
  };

  const handleStopCronometro = () => {
    setCronometroActivo(false);
    setCronometroPausado(false);
    clearInterval(cronometroRef.current);
    setCronometroTiempo(0);
  };

  const handlePauseCronometro = () => {
    setCronometroPausado(true);
    clearInterval(cronometroRef.current);
  };

  const handleResumeCronometro = () => {
    setCronometroPausado(false);
    cronometroRef.current = setInterval(() => {
      setCronometroTiempo((prevTime) => prevTime + 1);
    }, 1000);
  };

  const renderCronometro = () => {
    const minutes = Math.floor(cronometroTiempo / 60);
    const seconds = cronometroTiempo % 60;
    return (
      <p style={{ fontSize: '8rem', marginBottom: '0px', fontWeight: 'bold' }}>
        {`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
      </p>
    );
  };

  const handleStartTemporizadorAzul = () => {
    setTemporizadorAzulTiempo(60)
    setTemporizadorAzulActivo(true);
  };

  const handlePauseTemporizadorAzul = () => {
    setTemporizadorAzulActivo(false);
  };

  const handleStartTemporizadorRojo = () => {
    setTemporizadorRojoTiempo(60)
    setTemporizadorRojoActivo(true);
  };

  const handlePauseTemporizadorRojo = () => {
    setTemporizadorRojoActivo(false);
  };

  useEffect(() => {
    let interval;

    if (temporizadorAzulActivo && temporizadorAzulTiempo > 0) {
      interval = setInterval(() => {
        setTemporizadorAzulTiempo((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!temporizadorAzulActivo && temporizadorAzulTiempo === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [temporizadorAzulActivo, temporizadorAzulTiempo]);

  useEffect(() => {
    let interval;

    if (temporizadorRojoActivo && temporizadorRojoTiempo > 0) {
      interval = setInterval(() => {
        setTemporizadorRojoTiempo((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!temporizadorRojoActivo && temporizadorRojoTiempo === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [temporizadorRojoActivo, temporizadorRojoTiempo]);


  //Metodos de ganador
  const handleGanador = (ganadorId) => {

    //Obtenemos la batalla Id
    const batallaId = sessionStorage.getItem('selectedBatallaId');
    const tiempo = cronometroTiempo;

    const actualizarGanador = async () => {
      try {
        const data = { batallaId: batallaId, ganadorId: ganadorId, tiempo: tiempo }
        await axios.put("batalla/actualizarGanador", data)
        new Noty({
          type: 'success',
          text: 'Ganador actualizado!',
          timeout: 1500
        }).show();
      } catch (error) {
        console.log(error)
      }
    }
    actualizarGanador();
    setBotonesDeshabilitados(true);
  }

  //Metodo Tablas
  const handleTablas = () => {

    const batallaId = sessionStorage.getItem('selectedBatallaId');

    const generarEmpate = async () => {

      try {
        //Hacemos petición
        await axios.put(`/actualizarEmpate/${batallaId}`);

        //Generamos notificación
        new Noty({
          type: 'success',
          text: 'Batalla ha sido declarada como empate!',
          timeout: 1500
        }).show();
      } catch (error) {
        console.log(error)
      }
    }

    generarEmpate();
    setBotonesDeshabilitados(true);
  }

  const handleTerminar = () => {
    new Noty({
      type: 'information',
      text: 'La batalla ha terminado',
      timeout: 1500
    }).show();

    setBotonesDeshabilitados(true);
    setTimeout(() => {
      window.location.href = '/batallas'; // Redirige
    }, 1500);
  }

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative' }}>
        <img style={{ width: '100%' }} src="https://i.ibb.co/Xkm32Tt/Brand.jpg" alt="BannerVS" />


        <div style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'space-between', color: 'white', height: '100%', top: '0px' }}>
          {/* Peleador azul */}
          <div style={{ display: 'flex', alignItems: 'flex-end', padding: '20px', fontSize: "8rem" }}>
            <h1 style={{ fontSize: "3.5rem" }}><span>F{peleadorAzul.frente}</span><span> {peleadorAzul.peso}</span> <span>#{peleadorAzul.anillo}</span><br /><span>{peleadorAzul.cuerda}</span></h1>
          </div>

          {/* Peleador Rojo */}
          <div style={{ display: 'flex', alignItems: 'flex-start', textAlign: 'right', padding: '20px', fontSize: "8rem" }}>
            <h1 style={{ fontSize: "3.5rem" }}><span>{peleadorRojo.cuerda}</span><br /><span>F{peleadorRojo.frente}</span><span> {peleadorRojo.peso}</span><span> #{peleadorRojo.anillo}</span></h1>
          </div>
        </div>
      </div>


      <Container style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-around' }}>
        <div className='Cronometro'>
          {!cronometroActivo ? (
            <div>
              <p style={{ fontSize: '8rem', marginBottom: '0px', fontWeight: 'bold' }}>00:00</p>
              <Button variant="outlined" color="inherit" size='small' onClick={handleStartCronometro}>
                Iniciar Cronómetro
              </Button>
            </div>
          ) : (
            <>
              {renderCronometro()}
              {!cronometroPausado ? (
                <Button variant="outlined" color="primary" onClick={handlePauseCronometro}>
                  Pausar Cronómetro
                </Button>
              ) : (
                <Button variant="outlined" color="primary" onClick={handleResumeCronometro}>
                  Reanudar Cronómetro
                </Button>
              )}
              <Button variant="outlined" color="primary" onClick={handleStopCronometro}>
                Reiniciar Cronómetro
              </Button>
            </>
          )}
        </div>

        <div className='Relojitos' style={{ display: 'flex' }}>
          <div className='timerAzul'>
            <div>
              {!temporizadorAzulActivo ? (
                <>
                  <p style={{ fontSize: '6rem', marginBottom: '0px', marginRight: '40px', color: '#3E5CAA', fontWeight: 'bold' }}>60s</p>
                  <Button variant="contained" color="primary" onClick={handleStartTemporizadorAzul}>
                    Activar Azul
                  </Button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '6rem', marginBottom: '0px', marginRight: '40px', color: '#3E5CAA', fontWeight: 'bold' }}>{temporizadorAzulTiempo}s</p>
                  <Button variant="outlined" color="primary" onClick={handlePauseTemporizadorAzul}>
                    Pausar Temporizador Azul
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className='timerRojo'>
            <div>
              {!temporizadorRojoActivo ? (
                <>
                  <p style={{ fontSize: '6rem', marginBottom: '0px', marginRight: '40px', color: '#F14668', fontWeight: 'bold' }}>60s</p>
                  <Button variant="contained" color="error" onClick={handleStartTemporizadorRojo}>
                    Activar Rojo
                  </Button>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '6rem', marginBottom: '0px', marginRight: '40px', color: '#F14668', fontWeight: 'bold' }}>{temporizadorRojoTiempo}s</p>
                  <Button variant="outlined" color="primary" onClick={handlePauseTemporizadorRojo}>
                    Pausar Temporizador Rojo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'center', position: 'absolute', bottom: '0px', width: '100%' }}>
      <Button
        style={{ margin: '5px' }}
        variant="outlined"
        color="primary"
        size="small"
        onClick={() => {
          handleGanador(peleadorAzul._id);
        }}
        disabled={botonesDeshabilitados}
      >
        Ganador Azul
      </Button>
      <Button
        style={{ margin: '5px' }}
        variant="outlined"
        color="error"
        size="small"
        onClick={() => {
          handleGanador(peleadorRojo._id);
        }}
        disabled={botonesDeshabilitados}
      >
        Ganador Rojo
      </Button>
      <Button
        style={{ margin: '5px' }}
        variant="outlined"
        color="inherit"
        size="small"
        onClick={() => {
          handleTablas();
        }}
        disabled={botonesDeshabilitados}
      >
        Tablas
      </Button>
      <Button
        style={{ margin: '5px' }}
        variant="contained"
        color="inherit"
        size="small"
        onClick={() => {
          handleTerminar();
        }}
        disabled={botonesDeshabilitados}
      >
        Terminar
      </Button>
      </div>

    </section>
  );
}


