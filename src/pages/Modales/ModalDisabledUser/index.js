import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DisabledUserForm from '../../../components/forms/DisbledUserForm/DisabledUserForm'

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

const Buttons = {
  margin: '10%',
  marginBottom: '0%'
};

export default function ModalDisabledUser({ visibility, setVisibility , userData }) {
  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Seguro que desea {userData.estatus?'desahabilitar':'Habilitar'} a el usuario {userData.usu} ?
          </Typography>
          <DisabledUserForm userData={userData} setVisibility={setVisibility} />
        </Box>
      </Modal>
    </div>
  );
}
