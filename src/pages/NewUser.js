import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Stack, TextField, Container, Typography, InputLabel, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';

const LabelSelect = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  paddingRight: 5
}));

export default function NewUser() {
  return (
    <Page title="Crear Usuario | SGC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Crear Usuario
          </Typography>
        </Stack>
        <Stack direction="row">
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Correo" variant="outlined" />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Cedula" variant="outlined" />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Nombres" variant="outlined" />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Apellidos" variant="outlined" />
          </div>
        </Stack>
        <Stack direction="row">
          <FormControl style={{ width: 200, margin: 10 }}>
            <LabelSelect id="demo-simple-select-label">Núcleo</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={null}
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Telefono" variant="outlined" />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Contraseña" variant="outlined" />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Repetir Contraseña" variant="outlined" />
          </div>
        </Stack>
        <Stack direction="row">
          <FormControl style={{ width: 200, margin: 10 }}>
            <LabelSelect id="demo-simple-select-label">Prioridad de Usuario</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={null}
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button style={{ marginLeft: '90%' }} variant="contained">
          Enviar
        </Button>
      </Container>
    </Page>
  );
}
