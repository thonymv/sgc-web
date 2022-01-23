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
import {reactLocalStorage} from 'reactjs-localstorage';
import api from 'src/services/api';
import NewPnfForm from 'src/components/forms/NewPnfForm/NewPnfForm'

const LabelSelect = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  paddingRight: 5
}));



export default function NewPnf() {

  const navigate = useNavigate();

  const [nucleos, setNucleos] = useState('')
  const token = reactLocalStorage.get('token', true);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/json'
  };


  useEffect(() => {
    getNucleos();
    if(!token){
      navigate('/login')
    }
}, [])

const getNucleos = async () => {
  api.get('/nucleos', config).then((res) => {
    const nucleos = res.data;
    setNucleos(nucleos);
    console.log(nucleos);
  }); 
}


  return (
    <Page title="Crear Usuario | SGC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Crear Plan de Estudio 
          </Typography>
        </Stack>
        <NewPnfForm nucleos={nucleos} />
      </Container>
    </Page>
  );
}
