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

const TextAreas = (error) => ({
  marginTop: '4em',
  padding: '1em',
  borderColor: error ? 'red' : '#e3e3e3',
  borderRadius: '1em'
});

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

  const contenidoSchema = Yup.object().shape({
    codigo: Yup.string().required('Este campo es requerido'),
    duracion: Yup.string().required('Este campo es requerido'),
    malla: Yup.string().required('Este campo es requerido'),
    unidad_curricular: Yup.string().required('Este campo es requerido'),
    trayecto: Yup.string().required('Este campo es requerido'),
    creditos: Yup.string().required('Este campo es requerido'),
    densidad: Yup.string().required('Este campo es requerido'),
    hora_academica: Yup.string().required('Este campo es requerido'),
    htea: Yup.string().required('Este campo es requerido'),
    htei: Yup.string().required('Este campo es requerido'),
    tipo: Yup.string().required('Este campo es requerido'),
    thte: Yup.string().required('Este campo es requerido'),
    saberes: Yup.string().required('Este campo es requerido'),
    estrategias: Yup.string().required('Este campo es requerido'),
    recursos: Yup.string().required('Este campo es requerido'),
    evaluacion: Yup.string().required('Este campo es requerido'),
    malla: Yup.string().required('Este campo es requerido'),
    referencias: Yup.string().required('Este campo es requerido')
  });

  const formik = useFormik({
    initialValues: {
      codigo: '',
      duracion: '',
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
    validationSchema: contenidoSchema,
    onSubmit: async () => {
      const codigo = formik.getFieldProps('codigo').value;
      const duracion = formik.getFieldProps('duracion').value;
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
      const malla = formik.getFieldProps('malla').value;

      const req = api.post('/api/contenido', {
        codigo: codigo,
        duracion: duracion,
        malla: malla,
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
                <TextField
                  {...getFieldProps('codigo')}
                  label="Código"
                  variant="outlined"
                  helperText={touched.codigo && errors.codigo} error={Boolean(touched.codigo && errors.codigo)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField helperText={touched.duracion && errors.duracion} error={Boolean(touched.duracion && errors.duracion)} {...getFieldProps('duracion')} type={'number'} id="outlined-basic" label="Duración" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField helperText={touched.unidad_curricular && errors.unidad_curricular} error={Boolean(touched.unidad_curricular && errors.unidad_curricular)} {...getFieldProps('unidad_curricular')} id="outlined-basic" label="Nombre de unidad curricular" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <LabelSelect id="demo-simple-select-label">Malla curricular</LabelSelect>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...getFieldProps('malla')}
                  helperText={touched.malla && errors.malla} error={Boolean(touched.malla && errors.malla)}
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
                <TextField {...getFieldProps('trayecto')} error={Boolean(touched.trayecto && errors.trayecto)} helperText={touched.trayecto && errors.trayecto} id="outlined-basic" label="Trayecto" type={'number'} variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField helperText={touched.creditos && errors.creditos} error={Boolean(touched.creditos && errors.creditos)} {...getFieldProps('creditos')} id="outlined-basic" label="Creditos" type={'number'} variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField helperText={touched.densidad && errors.densidad} error={Boolean(touched.densidad && errors.densidad)} {...getFieldProps('densidad')} id="outlined-basic" label="Densidad" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField helperText={touched.hora_academica && errors.hora_academica} error={Boolean(touched.hora_academica && errors.hora_academica)}  {...getFieldProps('hora_academica')} id="outlined-basic" label="Hora de academia" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField helperText={touched.htea && errors.htea} error={Boolean(touched.htea && errors.htea)} {...getFieldProps('htea')} id="outlined-basic" label="HTEA" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField helperText={touched.htei && errors.htei} error={Boolean(touched.htei && errors.htei)} {...getFieldProps('htei')} id="outlined-basic" label="HTEI" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <TextField helperText={touched.tipo && errors.tipo} error={Boolean(touched.tipo && errors.tipo)} {...getFieldProps('tipo')} id="outlined-basic" label="Tipo" variant="outlined" />
              </FormControl>
              <FormControl fullWidth>
                <TextField helperText={touched.thte && errors.thte} error={Boolean(touched.thte && errors.thte)} {...getFieldProps('thte')} id="outlined-basic" label="THTE" variant="outlined" />
              </FormControl>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Saberes</InputLabel>
                <TextareaAutosize
                  maxRows={50}
                  minRows={10}
                  aria-label="maximum height"
                  placeholder="Maximum 50 rows"
                  style={TextAreas(Boolean(touched.saberes && errors.saberes))}
                  {...getFieldProps('saberes')}
                  helperText={touched.saberes && errors.saberes}
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
                  style={TextAreas(Boolean(touched.estrategias && errors.estrategias))}
                  helperText={touched.estrategias && errors.estrategias}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Recursos</InputLabel>
                <TextareaAutosize
                  maxRows={50}
                  minRows={10}
                  aria-label="maximum height"
                  placeholder="Maximum 50 rows"
                  style={TextAreas(Boolean(touched.recursos && errors.recursos))}
                  {...getFieldProps('recursos')}
                  helperText={touched.recursos && errors.recursos}
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
                  style={TextAreas(Boolean(touched.evaluacion && errors.evaluacion))}
                  helperText={touched.evaluacion && errors.evaluacion}
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
                  style={TextAreas(Boolean(touched.referencias && errors.referencias))}
                  helperText={touched.referencias && errors.referencias}
                />
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
