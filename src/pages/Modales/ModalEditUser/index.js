import * as React from 'react';
import { Box, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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
  margin: '10%',
  marginBottom: '0%',
  marginTop: '6%'
};

export default function ModalEditUser({ visibility, setVisibility }) {
  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField style={TexField} id="outlined-basic" label="Correo" variant="outlined" />
          <TextField style={TexField} id="outlined-basic" label="Cedula" variant="outlined" />
          <TextField style={TexField} id="outlined-basic" label="Nombres" variant="outlined" />
          <TextField style={TexField} id="outlined-basic" label="Apellidos" variant="outlined" />
          <FormControl style={TexField}>
            <InputLabel id="demo-simple-select-label">Institución</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Institución"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField style={TexField} id="outlined-basic" label="Telefono" variant="outlined" />
          <FormControl style={TexField}>
            <InputLabel id="demo-simple-select-label">Rol de usuario</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="Institución"
              label="Age"
            >
              <MenuItem value={10}>Administrador</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div style={{ flexDirection: 'row' }}>
            <Button
              onClick={() => setVisibility(false)}
              color="error"
              variant="contained"
              style={Buttons}
            >
              Cancelar
            </Button>
            <Button variant="contained" style={Buttons}>
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
