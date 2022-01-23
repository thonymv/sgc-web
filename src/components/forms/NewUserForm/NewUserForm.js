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
export default function NewUserForm({ nucleos }) {
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
        usu: '' ,
        nomb1: '',
        nomb2: '',
        apel1: '',
        apel2: '',
        ci: '',
        nuc_usu: '',
        tlf_movil: '' ,
        tlf_hab: '' ,
        fh_nac: '',
        rol: ''
    },
    validationSchema: Scheme,
    onSubmit: async () => {
      const usu = formik.getFieldProps('usu').value;
      const clave = formik.getFieldProps('clave').value;
      const nomb1 = formik.getFieldProps('nomb1').value;
      const nomb2 = formik.getFieldProps('nomb2').value;
      const apel1 = formik.getFieldProps('apel1').value;
      const apel2 = formik.getFieldProps('apel2').value;
      const ci = formik.getFieldProps('ci').value;
      const tlf_movil = formik.getFieldProps('tlf_movil').value;
      const tlf_hab = formik.getFieldProps('tlf_hab').value;
      const fh_nac = formik.getFieldProps('fh_nac').value;

      const req = api.post('/usuarios', {
          usu: usu,
          clav_usu:clave,
          nomb1: nomb1,
          nomb2: nomb2,
          apel1: apel1,
          apel2: apel2,
          ci: ci,
          tlf_movil: tlf_movil,
          tlf_hab: tlf_hab,
          fh_nac: fh_nac,
          rol : rol ,
          nuc_usu: nuc
      }, config );

      try {
          const response = await req;

          if (response && response.data && response.data.error) {
            notifyError(response.data.error);
            console.log(response.data.error)
            console.log(usu);
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
                label="Correo" 
                variant="outlined" 
                {...getFieldProps('usu')}
                style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField 
            id="outlined-basic" 
            label="Cedula"
            variant="outlined" 
            {...getFieldProps('ci')}
            style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Primer Nombre" variant="outlined" 
              {...getFieldProps('nomb1')}
              style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Segundo Nombre" variant="outlined" 
              {...getFieldProps('nomb2')}
              style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Primer Apellido" variant="outlined" 
              {...getFieldProps('apel1')}
              style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Segundo Apellido" variant="outlined" 
              {...getFieldProps('apel2')}
              style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Fecha de Nacimiento" variant="outlined" 
              {...getFieldProps('fh_nac')}
              style={TexField}
            />
          </div>
        </Stack>
        <Stack direction="row">
          <FormControl style={{ width: 200, margin: 10 }}>
            <LabelSelect id="demo-simple-select-label">Núcleo</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nuc}
              label="Age"
              onChange={handleChangeNucleo}
            >
                {nucleos?nucleos.map((row) => {
                    return( <MenuItem value={row.id_nuc}>{row.nuc}</MenuItem>                    )
                } ): " "}
            </Select>
          </FormControl>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Telefono Movil" variant="outlined" 
              {...getFieldProps('tlf_movil')}
              style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField id="outlined-basic" label="Telefono Habitación" variant="outlined" 
              {...getFieldProps('tlf_hab')}
              style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField
                autoComplete="current-password"
                type={'password'}
                label="Contraseña"
                {...getFieldProps('clave')}
                error={Boolean(touched.repetir && errors.repetir)}
                helperText={touched.repetir && errors.repetir}
                style={TexField}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField
                autoComplete="current-password"
                type={'password'}
                label="Repetir Contraseña"
                {...getFieldProps('repetir')}
                error={Boolean(touched.repetir && errors.repetir)}
                helperText={touched.repetir && errors.repetir}
                style={TexField}
            />
          </div>
        </Stack>
        <Stack direction="row">
          <FormControl style={{ width: 200, margin: 10 }}>
            <LabelSelect id="demo-simple-select-label">Prioridad de Usuario</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rol}
              label="Age"
              onChange={handleChangeRol}
            >
              <MenuItem value={'true'}>Administrador</MenuItem>
              <MenuItem value={'false'}>Usuario</MenuItem>
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
