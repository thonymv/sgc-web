import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import api from '../../../services/api'
// material
import {
  Stack,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------
const LabelSelect = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  paddingRight: 5
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '98%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const TexFieldStyle = {
  width: '100%',
  marginBottom: '3%'
};

const Buttons = {
  marginLeft: '10%',
  marginBottom: '0%',
  marginTop: '0%',
};
export default function EditUserForm({ userData, nucleos, setVisibility }) {
  const navigate = useNavigate();

  const { usuario, nombre, nombre2, apellido, apellido2, ci, tlf_movil, nacimiento, id } = userData;

  const nuc = userData.nucleo

  const [nucleo, setNucleo] = useState('')

  const EditSchema = Yup.object().shape({
    usuario: Yup.string().required('El nombre de usuario es requerido'),
  });

  const token = localStorage.getItem('token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/json'
  };

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

  const notifySuccess = (message) =>
    toast.success(message, {
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
      usuario: usuario,
      nombre: nombre,
      nombre2: nombre2,
      apellido: apellido,
      apellido2: apellido2,
      ci: ci,
      nuc: nuc,
      tlf_movil: tlf_movil,
      nacimiento: nacimiento
    },
    onSubmit: async () => {
      const usuario = formik.getFieldProps('usuario').value;
      const nombre = formik.getFieldProps('nombre').value;
      const nombre2 = formik.getFieldProps('nombre2').value;
      const apellido = formik.getFieldProps('apellido').value;
      const apellido2 = formik.getFieldProps('apellido2').value;
      const ci = formik.getFieldProps('ci').value;
      const tlf_movil = formik.getFieldProps('tlf_movil').value;
      const nacimiento = formik.getFieldProps('nacimiento').value;


      const req = api.put(`api/users/${id}`, {
        usuario: usuario,
        nombre: nombre,
        nombre2: nombre2,
        apellido: apellido,
        apellido2: apellido2,
        nucleo: nucleo,
        ci: ci,
        tlf_movil: tlf_movil,
        nacimiento: nacimiento,
      }, config);

      try {
        const response = await req;
        notifySuccess('Actualización Exitosa!')
      } catch (error) {
        console.log(error);
      }

    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleChangeNucleo = (event) => {
    setNucleo(event.target.value)
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="nombre"
            type="text"
            label="Primer Nombre"
            {...getFieldProps('nombre')}
            style={TexFieldStyle}
          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="nombre2"
            type="text"
            label="Segundo Nombre"
            {...getFieldProps('nombre2')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="apellido"
            type="text"
            label="Primer Apellido"
            {...getFieldProps('apellido')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="apellido2"
            type="text"
            label="Segundo Apellido"
            {...getFieldProps('apellido2')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="ci"
            type="text"
            label="Cedula"
            {...getFieldProps('ci')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="tlf_movil"
            type="text"
            label="Telefono Movil"
            {...getFieldProps('tlf_movil')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="nacimiento"
            type="text"
            label="Fecha de Nacimiento"
            {...getFieldProps('nacimiento')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <FormControl style={TexFieldStyle}>
            <LabelSelect id="demo-simple-select-label">Núcleo</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nucleo}
              label="nucleo"
              onChange={handleChangeNucleo}
            >
              {nucleos?.map((nucleo) => {
                return (
                  <MenuItem value={nucleo.id_nuc}>{nucleo.nuc}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Stack>
        <div style={{ marginLeft: '16%' }}>
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={Buttons}
          >
            Guardar
          </LoadingButton>
          <Button
            size="small"
            color="error"
            variant="contained"
            style={Buttons}
            onClick={() => setVisibility(false)}
          >
            Cerrar
          </Button>
        </div>

      </Form>
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
    </FormikProvider>
  );
}
