import { useState, useEffect } from 'react';
// material
import { Box, Grid, Container, Typography, InputLabel, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Bienvenido, %nombre_usuario%. Hoy es 08/12/2021 Su última sesión fue el 08/12/2021
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl style={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Núcleo</InputLabel>
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
              <InputLabel id="demo-simple-select-label">Plan de Estudio (PNF)</InputLabel>
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
              <InputLabel id="demo-simple-select-label">Malla curricular</InputLabel>
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
            <Button to="#" size="small" color="primary" background="primary">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
