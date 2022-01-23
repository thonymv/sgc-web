import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditPassForm from '../../../components/forms/EditPassForm/EditPassForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
  marginTop: '6%'
};

export default function ModalEditPasswordUser({ visibility, setVisibility, userData }) {
  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <EditPassForm userData={userData} setVisibility={setVisibility} />
        </Box>
      </Modal>
    </div>
  );
}
