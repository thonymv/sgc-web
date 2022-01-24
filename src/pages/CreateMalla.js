import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Stack, TextField, Container, Typography, InputLabel, Divider as DividerAlias } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import { reactLocalStorage } from 'reactjs-localstorage';
import { styled } from '@mui/material/styles';

const LabelSelect = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  paddingRight: 5
}));

const Divider = styled(DividerAlias)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    opacity: 0,
    marginBottom: 0,
  },
}));

const TextAreas = {
  marginRight: '3%'
};

const Buttons = {
  marginLeft: '90%',
  marginTop: '4%'
};

export default function CreateMalla() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = reactLocalStorage.get('token', true);
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <Page title="Crear contenido sinóptico | SGC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Crear malla
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">Nucleo</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="age"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">PNF</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="age"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">Modalidad</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="age"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Codigo" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Periodos" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Trayectos" variant="outlined" />
          </FormControl>
        </Stack>
        <div style={{ flexDirection: 'row' }}>
          <Button variant="contained" style={Buttons}>
            Guardar
          </Button>
        </div>
      </Container>
    </Page>
  );
}
