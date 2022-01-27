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
  height: '90%',
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
  fontSize: '15px',
  fontWeight: 'bold',
};

export default function ModalViewContent({ visibility, setVisibility, contenido }) {
  const renderModalidad = (modalidad, duracion) => {
    let result = ''
    switch (modalidad) {
      case 0:
        result = duracion > 1 ? 'trimestres' : 'trimestre';
        break;
      case 1:
        result = duracion > 1 ? 'semestres' : 'semestre';
        break;
      default:
        result = duracion > 1 ? 'años' : 'año';
        break;
    }
    return result
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
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
            <Typography style={header}>{`${contenido.unidad_curricular} Trayecto ${contenido.trayecto}`}</Typography>
          </div>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: '95%',
              '& ul': { padding: 0 }
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                <ListSubheader style={subheader}>Código</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.codigo} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Duración</ListSubheader>
                <ListItem>
                  <ListItemText
                    primary={`${contenido.duracion} ${renderModalidad(contenido.malla_data.modalidad, contenido.duracion)}`}
                  />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>HTEA</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.htea} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>HTEI</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.htei} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Tipo</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.tipo} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>THTE</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.thte} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Hora Académica</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.hora_academica} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Hora Académica</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.hora_academica} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Densidad</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.densidad} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Créditos</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.creditos} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Trayecto</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.trayecto} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Unidad Curricular</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.unidad_curricular} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Malla Curricular</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.malla_data?.codigo} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Saberes</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.saberes} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Recursos</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.recursos} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Estrategias</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.estrategias} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Evaluación</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.evaluacion} />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Referencias</ListSubheader>
                <ListItem>
                  <ListItemText primary={contenido.referencias} />
                </ListItem>
              </ul>
            </li>
          </List>
        </Box>
      </Modal>
    </div>
  );
}
