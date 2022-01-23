import * as Yup from 'yup';
import { useState , useEffect } from 'react';
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
export default function EditUserForm({ userData , nucleos , setVisibility }) {
  const navigate = useNavigate();

  const { usu , nomb1 , nomb2 , apel1 , apel2 ,ci , nuc_usu , tlf_movil, fh_nac } = userData;

  const [nucleo, setNucleo] = useState('')

  const EditSchema = Yup.object().shape({
    nomb1: Yup.string().required('El nombre de usuario es requerido'),
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
      usu: usu ,
      nomb1: nomb1,
      nomb2: nomb2,
      apel1: apel1,
      apel2: apel2,
      ci: ci,
      nuc_usu: nuc_usu,
      tlf_movil: tlf_movil ,
      fh_nac: fh_nac
    },
    onSubmit: async () => {
      const usu = formik.getFieldProps('usu').value;
      const nomb1 = formik.getFieldProps('nomb1').value;
      const nomb2 = formik.getFieldProps('nomb2').value;
      const apel1 = formik.getFieldProps('apel1').value;
      const apel2 = formik.getFieldProps('apel2').value;
      const ci = formik.getFieldProps('ci').value;
      const tlf_movil = formik.getFieldProps('tlf_movil').value;
      const fh_nac = formik.getFieldProps('fh_nac').value;


      const req = api.put('/usuarios', {
          usu: usu,
          nomb1: nomb1 ,
          nomb2 : nomb2,
          apel1: apel1,
          apel2: apel2,
          nuc_usu: nucleo,
          ci:ci,
          tlf_movil: tlf_movil,
          fh_nac: fh_nac ,
      }, config );

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
            autoComplete="nomb1"
            type="text"
            label="Primer Nombre"
            {...getFieldProps('nomb1')}
            style={TexFieldStyle}
          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="nomb2"
            type="text"
            label="Segundo Nombre"
            {...getFieldProps('nomb2')}
            style={TexFieldStyle}

          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="apel1"
            type="text"
            label="Primer Apellido"
            {...getFieldProps('apel1')}
            style={TexFieldStyle}

          />
        </Stack>        
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="apel2"
            type="text"
            label="Segundo Apellido"
            {...getFieldProps('apel2')}
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
            autoComplete="fh_nac"
            type="text"
            label="Fecha de Nacimiento"
            {...getFieldProps('fh_nac')}
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
                return(
                  <MenuItem value={nucleo.id_nuc}>{nucleo.nuc}</MenuItem>
                )
              })}
            </Select>
         </FormControl>   
        </Stack>   
        <div style={{marginLeft:'16%'}}>
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
