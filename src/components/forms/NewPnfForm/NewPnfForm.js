import * as Yup from 'yup';
import { useState , useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import api from '../../../services/api'
// material
import { styled } from '@mui/material/styles';
import {
    Stack,
    FormControl,
    Select,
    MenuItem,
    Button,
    TextField,
    InputLabel
} from '@mui/material';
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
  
  const TexField = {
    width: '100%',
    marginBottom: '2%'
  };
  
  const Buttons = {
    marginLeft: '10%',
    marginBottom: '0%',
    marginTop: '0%',
  };
export default function NewPnfForm({ nucleos }) {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [rol, setRol] = useState('')
  const [nuc, setNuc] = useState('')

  const Scheme = Yup.object().shape({
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
      mod_pnf: '' ,
        pnf: ''
    },
    validationSchema: Scheme,
    onSubmit: async () => {
      const mod_pnf = formik.getFieldProps('mod_pnf').value;
      const pnf = formik.getFieldProps('pnf').value;

      const req = api.post('/pnfs', {
          mod_pnf:mod_pnf,
          pnf: pnf
      }, config );

      try {
          const response = await req;

          if (response && response.data && response.data.error) {
            notifyError(response.data.error);
            console.log(response.data.error)
            return;
          }
          notifySuccess('Registrado con Exito!')
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

  const handleChangeNucleo = (event) => {
    setNuc(event.target.value)
  }; 

  const handleChangeRol = (event) => {
    setRol(event.target.value)
  }; 

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row">
          <div style={{ margin: 10 }}>
            <TextField 
                id="outlined-basic" 
                label="PNF" 
                variant="outlined" 
                {...getFieldProps('pnf')}
                style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Modalidad" variant="outlined" 
              {...getFieldProps('mod_pnf')}
              style={TexField}
            />
          </div>
        </Stack>
        <div style={{marginLeft:'-10%'}}>
        <LoadingButton
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={Buttons}
        >
          Guardar
        </LoadingButton>
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
