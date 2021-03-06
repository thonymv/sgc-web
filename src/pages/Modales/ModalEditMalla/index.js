import * as React from 'react';
import { Box, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import api from '../../../services/api'
import { ToastContainer, toast } from 'react-toastify';
import EditMallaForm from 'src/components/forms/EditMallaForm';
import 'react-toastify/dist/ReactToastify.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '85%',
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
  margin: '10%',
  marginBottom: '0%',
  marginTop: '10%'
};


export default function ModalEditMalla({ visibility, setVisibility, MallaData, drop, update, setMessage }) {

  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditMallaForm setMessage={setMessage} setVisibility={setVisibility} MallaData={MallaData} drop={drop} update={update} />
        </Box>
      </Modal>
    </div>
  );
}
