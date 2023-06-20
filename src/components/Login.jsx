import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import Noty from 'noty';


const theme = createTheme();

export default function SignIn() {

  const [user, setUser] = useState('')
  const [contrasena, setContrasena] = useState('')

  const login = async (e) => {
    e.preventDefault();
    const usuario = { user, contrasena };
    const respuesta = await Axios.post('/admin/login', usuario);
    console.log(respuesta);
    const mensaje = respuesta.data.mensaje;

    
    if (mensaje !== 'Bienvenido') {
      new Noty({  
        type: 'error',
        text: mensaje,
        theme: "bootstrap-v4.css",
        timeout: 1500
      }).show();

      console.log(mensaje)
    } else {
      const token = respuesta.data.token;
      const user = respuesta.data.user;
      const idUser = respuesta.data.id;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', user);
      sessionStorage.setItem('idUser', idUser);

      new Noty({
        type: 'success',
        text: mensaje,
        timeout: 1500
      }).show();

      window.location.href = "/inicio";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section className='container'>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <Container component="main" maxWidth="xs" style={{ height: '100%', display: 'flex' }}>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'black' }}>

              </Avatar>
              <Typography component="h1" variant="h5">
                BATALLA DE GALLOS
              </Typography>
              <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Nombre de usuario"
                  name="user"
                  autoComplete="user"
                  autoFocus
                  onChange={(e) => setUser(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setContrasena(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ingresar
                </Button>

              </Box>
            </Box>
          </Container>
        </div>
      </section>
    </ThemeProvider>
  );
}
