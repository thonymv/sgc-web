import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import { Divider as DividerAlias, Stack, TextField, Container, Typography, InputLabel } from '@mui/material';
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
  marginTop: '4em',
  padding: '0.5em'
};

const Buttons = {
  height:"3em"
};

export default function CreateContent() {

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
            Crear contenido
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Saberes</InputLabel>
            <TextareaAutosize
              maxRows={50}
              minRows={10}
              aria-label="maximum height"
              placeholder="Maximum 50 rows"
              style={TextAreas}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Recursos</InputLabel>
            <TextareaAutosize
              maxRows={50}
              minRows={10}
              aria-label="maximum height"
              placeholder="Maximum 50 rows"
              style={TextAreas}
            />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Contenido Analitíco</InputLabel>
            <TextareaAutosize
              minRows={10}
              maxRows={50}
              aria-label="maximum height"
              placeholder="Maximum 50 rows"
              style={TextAreas}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estrategias</InputLabel>
            <TextareaAutosize
              minRows={10}
              maxRows={50}
              aria-label="maximum height"
              placeholder="Maximum 50 rows"
              style={TextAreas}
            />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Evaluación</InputLabel>
            <TextareaAutosize
              minRows={10}
              maxRows={50}
              aria-label="maximum height"
              placeholder="Maximum 50 rows"
              style={TextAreas}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Referencias</InputLabel>
            <TextareaAutosize
              minRows={10}
              maxRows={50}
              aria-label="maximum height"
              placeholder="Maximum 50 rows"
              style={TextAreas}
            />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Nombre de unidad curricular" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">Malla curricular</LabelSelect>
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
            <TextField id="outlined-basic" label="Trayecto" type={'number'} variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Creditos" type={'number'} variant="outlined" />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Densidad" type={'number'} variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Hora de academia" type={'number'} variant="outlined" />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="HTA" type={'number'} variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="HTI" type={'number'} variant="outlined" />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Tipo" type={'number'} variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="THTE" type={'number'} variant="outlined" />
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <FormControl fullWidth>
          <Button variant="contained" style={Buttons}>
            Guardar
          </Button>
        </FormControl>
      </Container>
    </Page>
  );
}
