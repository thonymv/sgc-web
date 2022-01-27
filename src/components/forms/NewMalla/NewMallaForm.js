import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import api from '../../../services/api'
// material
import { styled } from '@mui/material/styles';
import {
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { Stack, TextField, Container, Typography, InputLabel, Divider as DividerAlias } from '@mui/material';
import { LoadingButton as ButtonAlias } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------
const LoadingButton = styled(ButtonAlias)(({ theme }) => ({
  marginBottom: '0%',
  marginTop: '0%',
  height: '3em',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
  },
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
  marginRight: '3%'
};



export default function NewMallaForm() {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [ pnfValue , setPnfValue] = useState('')
  const [ nucleosValue , setNucleosValue] = useState('')
  const [ modalidadValue , setModalidadValue] = useState('')

  const [nucleos , setNucleos ] = useState([]);
  const [pnf , setPnf ] = useState([]);


  const getPNF = () => {
    api.get('/api/pnf').then((res) => {
      const pnf = res.data.pnf;
      setPnf(pnf);
    }); 
  }
 

  const getNucleos = () => {
    api.get('/api/nucleo').then((res) => {
      const nucleo = res.data.nucleo;
      setNucleos(nucleo);
      console.log(nucleo);
    }); 
  }


  useEffect(() => {
   getNucleos();
   getPNF();
  }, [])


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
      nucleo: '',
      pnf: '',
      modalidad: '',
      codigo: '',
      periodos: '',
      trayectos: ''
    },
    onSubmit: async () => {
      //const nucleo = formik.getFieldProps('nucleo').value;
      //const pnf = formik.getFieldProps('pnf').value;
     // const modalidad = formik.getFieldProps('modalidad').value;
      const codigo = formik.getFieldProps('codigo').value;
      const periodos = formik.getFieldProps('periodos').value;
      const trayectos = formik.getFieldProps('trayectos').value;


      const req = api.post('/api/malla', {
        nucleo: nucleosValue,
        pnf: pnfValue,
        modalidad: modalidadValue,
        codigo: codigo,
        periodos: periodos,
        trayectos: trayectos
      });

      console.log([{
        nucleo: nucleosValue,
        pnf: pnfValue,
        modalidad: modalidadValue,
        codigo: codigo,
        periodos: periodos,
        trayectos: trayectos
      }]);

      try {
        const response = await req;

        if (response && response.data && response.data.error) {
          notifyError(response.data.error);
          console.log(response.data.error)
          return;
        }
        notifySuccess('Registrado con Exito!')
        navigate('/dashboard/Malla');
      } catch (error) {
        console.log(error);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



  const handValuePNF = (event) => {
    setPnfValue(event.target.value)
  };

  const handValueNucleos = (event) => {
    setNucleosValue(event.target.value)
  };

  const handValueModalidad = (event) => {
    setModalidadValue(event.target.value)
  };

  return (
    <div style={{ width: '100%', paddingLeft: "15%", paddingRight: "15%" }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">Nucleo</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nucleosValue}
              onChange={handValueNucleos}
              label="Age"
            >{
              nucleos?.map((nucleo) => 
              (<MenuItem value={nucleo.id}>{nucleo.nombre}</MenuItem>)
              )
            }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">PNF</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pnfValue}
              onChange={handValuePNF}
              label="Age"
            >
             { pnf?.map((pnf) => 
              (<MenuItem value={pnf.id}>{pnf.nombre}</MenuItem>)
              )
            }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <LabelSelect id="demo-simple-select-label">Modalidad</LabelSelect>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={modalidadValue}
              onChange={handValueModalidad}
              label="Age"
            >
              <MenuItem value={0}>Trismestral</MenuItem>
              <MenuItem value={1}>Semestral</MenuItem>
              <MenuItem value={2}>Anual</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Divider orientation="horizontal" flexItem />
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <TextField              
             {...getFieldProps('codigo')}
             id="outlined-basic" label="Codigo" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField               
            {...getFieldProps('periodos')}
            id="outlined-basic" label="Periodos" variant="outlined" type={'number'} />
          </FormControl>
          <FormControl fullWidth>
            <TextField 
            {...getFieldProps('trayectos')}
             id="outlined-basic" label="Trayectos" variant="outlined" type={'number'} />
          </FormControl>
        </Stack>
        <div style={{ flexDirection: 'row' }}>
        <FormControl>
            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Guardar
            </LoadingButton>
          </FormControl>
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
    </div>
  );
}
