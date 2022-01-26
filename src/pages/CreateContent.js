import * as Yup from 'yup';
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
import { useFormik, Form, FormikProvider } from 'formik';
import api from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

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
  height: "3em"
};

export default function CreateContent() {

  const navigate = useNavigate();
  const [mallasList, setMallasList] = useState([]);

  useEffect(() => {
    const token = reactLocalStorage.get('token', true);
    if (!token) {
      navigate('/login')
    }
    getMallas();
  }, [])

  function getMallas() {
    api.get(`api/malla`).then((res) => {
      const persons = res.data.mallas;
      setMallasList(persons);
      console.warn('persons:////', persons);
    });
  }

  const [malla, setMalla] = useState(0);

  const notifyError = (message) =>
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const formik = useFormik({
    initialValues: {
      malla: '',
      unidad_curricular: '',
      trayecto: '',
      creditos: '',
      densidad: '',
      hora_academica: '',
      htea: '',
      htei: '',
      tipo: '',
      thte: '',
      saberes: '',
      estrategias: '',
      recursos: '',
      evaluacion: '',
      referencias: ''
    },
    onSubmit: async () => {
      const unidad_curricular = formik.getFieldProps('unidad_curricular').value;
      const trayecto = formik.getFieldProps('trayecto').value;
      const creditos = formik.getFieldProps('creditos').value;
      const densidad = formik.getFieldProps('densidad').value;
      const hora_academica = formik.getFieldProps('hora_academica').value;
      const htea = formik.getFieldProps('htea').value;
      const htei = formik.getFieldProps('htei').value;
      const tipo = formik.getFieldProps('tipo').value;
      const thte = formik.getFieldProps('thte').value;
      const saberes = formik.getFieldProps('saberes').value;
      const estrategias = formik.getFieldProps('estrategias').value;
      const recursos = formik.getFieldProps('recursos').value;
      const evaluacion = formik.getFieldProps('evaluacion').value;
      const referencias = formik.getFieldProps('referencias').value;

      const req = api.post('/api/contenido', {
        malla: `${malla}`,
        unidad_curricular: unidad_curricular,
        trayecto: trayecto,
        creditos: creditos,
        densidad: densidad,
        hora_academica: hora_academica,
        htea: htea,
        htei: htei,
        tipo: tipo,
        thte: thte,
        saberes: saberes,
        estrategias: estrategias,
        recursos: recursos,
        evaluacion: evaluacion,
        referencias: referencias
      });

      try {
        const response = await req;

        if (response && response.data && response.data.error) {
          notifyError('Hubo un error en los datos ingresados');
          console.log(response.data.error)
          return;
        }
        navigate('/dashboard/contenido', { state: { success: true } })
        console.log(response.data)
      } catch (error) {
        notifyError('Hubo un error al comunicarse con el servidor');
        console.log(error);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <Page title="Crear contenido sinóptico | SGC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Crear contenido
          </Typography>
        </Stack>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Saberes</InputLabel>
                <TextareaAutosize
                  maxRows={50}
                  minRows={10}
                  aria-label="maximum height"
                  placeholder="Maximum 50 rows"
                  style={TextAreas}
                  {...getFieldProps('saberes')}
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
                  {...getFieldProps('recursos')}
                />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estrategias</InputLabel>
                <TextareaAutosize
                  minRows={10}
                  maxRows={50}
                  aria-label="maximum height"
                  placeholder="Maximum 50 rows"
                  {...getFieldProps('estrategias')}
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
                  {...getFieldProps('evaluacion')}
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
                  {...getFieldProps('referencias')}
                  style={TextAreas}
                />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('unidad_curricular')} id="outlined-basic" label="Nombre de unidad curricular" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <LabelSelect id="demo-simple-select-label">Malla curricular</LabelSelect>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={malla}
                  onChange={(event) => {
                    setMalla(event.target.value)
                  }}
                  label="Age"
                >
                  {
                    mallasList && mallasList.map((malla) => (<MenuItem value={malla.id}>{malla.codigo}</MenuItem>))
                  }
                </Select>
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('trayecto')} id="outlined-basic" label="Trayecto" type={'number'} variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField {...getFieldProps('creditos')} id="outlined-basic" label="Creditos" type={'number'} variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('densidad')} id="outlined-basic" label="Densidad" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField {...getFieldProps('hora_academica')} id="outlined-basic" label="Hora de academia" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('htea')} id="outlined-basic" label="HTEA" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField {...getFieldProps('htei')} id="outlined-basic" label="HTEI" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField {...getFieldProps('tipo')} id="outlined-basic" label="Tipo" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField {...getFieldProps('thte')} id="outlined-basic" label="THTE" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <FormControl fullWidth>
              <LoadingButton
                size="medium"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Guardar
              </LoadingButton>
            </FormControl>
          </Form>
        </FormikProvider>

      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Page>
  );
}
