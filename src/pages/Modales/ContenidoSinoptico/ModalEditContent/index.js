import * as React from 'react';
import { Box, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const LabelSelect = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  paddingRight: 5
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '100%',
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
  marginLeft: '35%',
  marginTop: '-8%',
  marginBottom: '-1%'
};

const Buttons = {
  margin: '5%',
  marginBottom: '0%',
  marginLeft: '10%',
  marginTop: '3%'
};

export default function ModalEditContent({ visibility, setVisibility }) {
  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={header}>Programación II</Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: '98%',
              '& ul': { padding: 0 }
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                <ListSubheader style={subheader}>Saberes</ListSubheader>
                <ListItem>
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    style={{ width: '90%' }}
                  />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Recursos</ListSubheader>
                <ListItem>
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    style={{ width: '90%' }}
                  />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Contenido Analitíco</ListSubheader>
                <ListItem>
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    style={{ width: '90%' }}
                  />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListSubheader style={subheader}>Estrategias</ListSubheader>
                <ListItem>
                  <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    style={{ width: '90%' }}
                  />
                </ListItem>
              </ul>
            </li>
            <li>
              <ul>
                <ListItem>
                  <FormControl style={{ width: '90%', marginLeft: '-1%' }}>
                    <LabelSelect id="demo-simple-select-label">Duración</LabelSelect>
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
                </ListItem>
              </ul>
            </li>
          </List>
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
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
