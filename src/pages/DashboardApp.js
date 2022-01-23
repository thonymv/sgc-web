import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography, InputLabel, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------
const LabelSelect = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  paddingRight: 5
}));

export default function DashboardApp() {
  const navigate = useNavigate();


  useEffect(() => {
      navigate('/dashboard/user')
    
  }, [])

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Bienvenido, Hoy es 08/12/2021 Su última sesión fue el 08/12/2021
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl style={{ width: 200 }}>
              <LabelSelect id="demo-simple-select-label">Núcleo</LabelSelect>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl style={{ width: 200 }}>
              <LabelSelect id="demo-simple-select-label">Plan de Estudio (PNF)</LabelSelect>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl style={{ width: 200 }}>
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
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button variant="contained" color="primary" background="primary">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
