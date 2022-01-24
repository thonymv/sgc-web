import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

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

const subheader = {
  color: 'black',
  fontWeight: 'bold'
};

const header = {
  color: 'black',
  fontSize: '24px',
  fontWeight: 'bold',
  marginLeft: '25%',
  marginTop: '-5%'
};
export default function ModalVerUsuario({ visibility, setVisibility, userData }) {
  const { nombre, nombre2, apellido, apellido2, ci, tlf_movil, nacimiento } = userData;
  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={header}>{`${nombre} ${apellido}`}</Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: '100%',
              '& ul': { padding: 0 }
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                <ListSubheader style={subheader}>Cédula</ListSubheader>
                <ListItem>
                  <ListItemText primary={ci} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Nombres</ListSubheader>
                <ListItem>
                  <ListItemText primary={`${nombre} ${nombre2} ${apellido} ${apellido2}`} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Nucleo</ListSubheader>
                <ListItem>
                  <ListItemText primary="Altagracia" />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Teléfono</ListSubheader>
                <ListItem>
                  <ListItemText primary={`${'+58'} ${tlf_movil}`} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Prioridad de usuario</ListSubheader>
                <ListItem>
                  <ListItemText primary="Administrador" />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Fecha de nacimiento</ListSubheader>
                <ListItem>
                  <ListItemText primary={nacimiento} />
                </ListItem>
              </ul>
            </li>
          </List>
        </Box>
      </Modal>
    </div>
  );
}
