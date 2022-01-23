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
  Link,
  Stack,
  Checkbox,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------
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
  
  const TexField = {
    width: '100%',
    marginBottom: '2%'
  };
  
  const Buttons = {
    marginLeft: '10%',
    marginBottom: '0%',
    marginTop: '0%',
  };
export default function EditPassForm({ userData , setVisibility }) {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  const { usu , clave_usu} = userData;

  const PassScheme = Yup.object().shape({
    clave: Yup.string().required('La contraseña es obilgatoria'),
    repetir: Yup.string()
       .oneOf([Yup.ref('clave'), null], 'Las contraseñas no coinciden')
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
      clave: ''
    },
    validationSchema: PassScheme,
    onSubmit: async () => {
      const usu = formik.getFieldProps('usu').value;
      const clave = formik.getFieldProps('clave').value;

      const req = api.put('/usuarios', {
          usu: usu,
          clave_usu:clave
      }, config );

      try {
          const response = await req;

          if (response && response.data && response.data.error) {
            notifyError('complete los datos correctamente');
            console.log(response.data.error)
            console.log(usu);
            return;
          }
          notifySuccess('Cambio Exitoso!')
      } catch (error) {
          console.log(error);
      }

    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  
  const handleShowPassword1 = () => {
    setShowPassword1((show) => !show);
  };

  const handleShowPassword2 = () => {
    setShowPassword2((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword1 ? 'text' : 'password'}
            label="Nueva Contraseña"
            {...getFieldProps('clave')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword1} edge="end">
                    <Icon icon={showPassword1 ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.clave && errors.clave)}
            helperText={touched.clave && errors.clave}
            style={TexField}
          />
        </Stack>
        <Stack spacing={3}>
        <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword2 ? 'text' : 'password'}
            label="Repetir Contraseña"
            {...getFieldProps('repetir')}
            error={Boolean(touched.repetir && errors.repetir)}
            helperText={touched.repetir && errors.repetir}
            style={TexField}
          />
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
          onClick={() => setVisibility()}
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
