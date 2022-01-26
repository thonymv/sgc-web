import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import api from '../../../../services/api'
import { LoadingButton } from '@mui/lab';
import { set } from 'lodash';

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

export default function ModalDeleteContent({ visibility, setVisibility, contenido, setMessage, deleteRow }) {

  const [isSubmitting, setSubmitting] = React.useState(false)

  const notifyError = (message) => setMessage(false, message)

  const notifySuccess = (message) => setMessage(true, message)

  const submitDelete = async () => {
    setSubmitting(true)
    const req = api.delete(`/api/contenido/${contenido.id}`);
    try {
      const response = await req;
      if (response && response.data && response.data.error) {
        notifyError('Hubo un error en los datos ingresados');
        setVisibility(false)
        setSubmitting(false)
        console.log(response.data.error)
        return;
      }
      notifySuccess('Eliminado con Exito!')
      deleteRow(contenido.id)
      setVisibility(false)
      console.log(response.data)
      setSubmitting(false)
    } catch (error) {
      notifyError('Hubo un error al comunicarse con el servidor');
      setVisibility(false)
      console.log(error);
      setSubmitting(false)
    }
  }
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
            Seguro que desea eliminar el contenido sinóptico ?
          </Typography>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20 }}>
            <Button
              onClick={() => setVisibility(false)}
              color="error"
              variant="contained"
              style={Buttons}
            >
              Cancelar
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              style={Buttons}
              loading={isSubmitting}
              onClick={submitDelete}
            >
              Confirmar
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
