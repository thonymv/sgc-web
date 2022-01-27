import * as Yup from 'yup';
import { useState , useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import api from '../../../services/api'
import { styled } from '@mui/material/styles';
// material
import {
  Link,
  Stack,
  Checkbox,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormControl,
  MenuItem,
  InputLabel,
  Select
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
    marginBottom: '5%'
  };
  
  const Buttons = {
    marginLeft: '10%',
    marginBottom: '0%',
    marginTop: '5%',
  };


  const LabelSelect = styled(InputLabel)(({ theme }) => ({
    backgroundColor: 'white',
    paddingRight: 5
  }));

export default function EditMallaForm({ MallaData , setVisibility, drop , update }) {

  const navigate = useNavigate();
  const { id  , codigo , nucleo , pnf , modalidad , periodos , trayectos } = MallaData

  const [ valueNucleo , setValueNucleo ] = useState(nucleo);
  const [ valuePnf , setValuePnf ] = useState(pnf);
  const [ valueModalidad , setValueModalidad ] = useState(modalidad);

  const [ recoverNucleo , setRecoverNucleo ] = useState([]);

  const [nucleos , setNucleos ] = useState([]);
  const [pnfData , setPnfData ] = useState([]);

  const getPNF = () => {
    api.get('/api/pnf').then((res) => {
      const pnf = res.data.pnf;
      setPnfData(pnf);
    }); 
  }
 

  const getNucleos = () => {
    api.get('/api/nucleo').then((res) => {
      const nucleo = res.data.nucleo;
      setNucleos(nucleo);
      console.log(nucleo);
    }); 
  }
  
  const getrecoverNucleo = (id) => {
   nucleos.map((row) => {
    if (row.id==id) {
      console.log('recover');
      console.log(row);
      setRecoverNucleo(row)
    }
    })
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
      codigo: codigo,
      periodos: periodos ,
      trayectos: trayectos ,
      modalidad: valueModalidad,
      pnf: valuePnf ,
      nucleo: valueNucleo
    },
    onSubmit: async () => {
      const codigo = formik.getFieldProps('codigo').value;
      const periodos = formik.getFieldProps('periodos').value;
      const trayectos = formik.getFieldProps('trayectos').value;

     getrecoverNucleo(id)

      const dup = {
        id:id,
        codigo: codigo, 
        periodos: periodos,
        trayectos: trayectos,
        modalidad: valueModalidad,
        pnf: valuePnf,
        nucleo_data: recoverNucleo
      }


      const req = api.put(`/api/malla/${id}`, {
          codigo: codigo, 
          periodos: periodos,
          trayectos: trayectos,
          modalidad: valueModalidad,
          pnf: valuePnf,
          nucleo: valueNucleo
      });

      try {
          const response = await req;

          if (response && response.data && response.data.error) {
            notifyError('error');
            console.log(response.data.error)
            return;
          }
          notifySuccess('Cambio Exitoso!')
          setTimeout(() => {
            setVisibility(false) 
            drop(false) 
            update(dup)
          } , 3000 )
      } catch (error) {
          console.log(error);
      }

    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  
  const handValuePNF = (event) => {
    setValuePnf(event.target.value)
  };

  const handValueNucleos = (event) => {
    setValueNucleo(event.target.value)
  };

  const handValueModalidad = (event) => {
    setValueModalidad(event.target.value)
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Codigo"
            {...getFieldProps('codigo')}
            error={Boolean(touched.clave && errors.clave)}
            helperText={touched.clave && errors.clave}
            style={TexField}
          />
        </Stack>
        <Stack spacing={3}>
        <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Periodos"
            {...getFieldProps('periodos')}
            error={Boolean(touched.repetir && errors.repetir)}
            helperText={touched.repetir && errors.repetir}
            style={TexField}
          />
        </Stack>
        <Stack spacing={3}>
        <TextField
            fullWidth
            autoComplete="current-password"
            type={'text'}
            label="Trayectos"
            {...getFieldProps('trayectos')}
            error={Boolean(touched.repetir && errors.repetir)}
            helperText={touched.repetir && errors.repetir}
            style={TexField}
          />
        </Stack>
        <Stack spacing={3}>
          <FormControl fullWidth             style={TexField}
>
              <LabelSelect id="demo-simple-select-label">Nucleo</LabelSelect>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueNucleo}
                label="Nucleo"
                onChange={handValueNucleos}
              >
                {nucleos?.map((row) => (<MenuItem value={row.id}>{row.nombre}</MenuItem>) )}
              </Select>
            </FormControl>
        </Stack>
        <Stack spacing={3}>
          <FormControl fullWidth             style={TexField}
>
              <LabelSelect id="demo-simple-select-label">PNF</LabelSelect>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valuePnf}
                label="pnf"
                onChange={handValuePNF}
              >
                {pnfData?.map((row) => (<MenuItem value={row.id}>{row.nombre}</MenuItem>) )}
              </Select>
            </FormControl>
        </Stack>
        <Stack spacing={3}>
          <FormControl fullWidth             style={TexField}
 >
              <LabelSelect id="demo-simple-select-label">Modalidad</LabelSelect>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueModalidad}
                label="modalidad"
                onChange={handValueModalidad}
              >
                <MenuItem value={0}>Trimestral</MenuItem>
                <MenuItem value={1}>Semestral</MenuItem>
                <MenuItem value={2}>Anual</MenuItem>
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
