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
    margin: '10%',
    marginBottom: '0%'
  };

export default function DeleteMallaForm({ userData , setVisibility , drop , deleted }) {
  const navigate = useNavigate();

  const { id  } = userData;


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
      id: id ,
    },
    onSubmit: async () => {
      const req = api.delete(`/api/malla/${id}`);


      try {
          const response = await req;
          notifySuccess('Acción completada con Exito!')
          setTimeout(() => {
             setVisibility(false)
             drop(false) 
             deleted(id)
            } , 3000 )
          
      } catch (error) {
          console.log(error);
      }

    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div style={{marginLeft:'16%', flexDirection:'row'}}>
        <LoadingButton
          size="small"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={Buttons}
        >
          Confirmar
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
