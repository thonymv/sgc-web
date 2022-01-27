import { useState, useEffect } from 'react'
import { Box, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import api from '../../../../services/api';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';

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
  p: 3,
  paddingBottom: 8
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

const Buttons = {
  margin: '5%',
  marginTop: '3%'
};

export default function ModalEditContent({ visibility, setVisibility, contenido, setMessage, updateList }) {

  const [mallasList, setMallasList] = useState([]);

  useEffect(() => {
    getMallas();
  }, [])

  function getMallas() {
    api.get(`api/malla`).then((res) => {
      const mallas = res.data.mallas;
      setMallasList(mallas);
    });
  }
  const getSelectMalla = (id) => {
    let malla = {}
    mallasList.map((row) => {
      if (row.id == id) {
        malla = row
      }
    })
    return malla
  }

  const [malla, setMalla] = useState(contenido.malla);

  const notifyError = (message) => setMessage(false, message)

  const notifySuccess = (message) => setMessage(true, message)

  const formik = useFormik({
    initialValues: {
      codigo: '',
      duracion: '',
      malla: '',
      unidad_curricular: '',
      trayecto: '',
      creditos: '',
      densidad: '',
      hora_academica: '',
      htea: '',
      htei: '',
      tipo: '',
      thte: '',
      saberes: '',
      estrategias: '',
      recursos: '',
      evaluacion: '',
      referencias: '',
      ...contenido,
    },
    onSubmit: async () => {
      const codigo = formik.getFieldProps('codigo').value;
      const duracion = formik.getFieldProps('duracion').value;
      const unidad_curricular = formik.getFieldProps('unidad_curricular').value;
      const trayecto = formik.getFieldProps('trayecto').value;
      const creditos = formik.getFieldProps('creditos').value;
      const densidad = formik.getFieldProps('densidad').value;
      const hora_academica = formik.getFieldProps('hora_academica').value;
      const htea = formik.getFieldProps('htea').value;
      const htei = formik.getFieldProps('htei').value;
      const tipo = formik.getFieldProps('tipo').value;
      const thte = formik.getFieldProps('thte').value;
      const saberes = formik.getFieldProps('saberes').value;
      const estrategias = formik.getFieldProps('estrategias').value;
      const recursos = formik.getFieldProps('recursos').value;
      const evaluacion = formik.getFieldProps('evaluacion').value;
      const referencias = formik.getFieldProps('referencias').value;

      const data = {
        codigo: codigo,
        duracion: duracion,
        malla: malla,
        unidad_curricular: unidad_curricular,
        trayecto: trayecto,
        creditos: creditos,
        densidad: densidad,
        hora_academica: hora_academica,
        htea: htea,
        htei: htei,
        tipo: tipo,
        thte: thte,
        saberes: saberes,
        estrategias: estrategias,
        recursos: recursos,
        evaluacion: evaluacion,
        referencias: referencias
      }

      const req = api.put(`/api/contenido/${contenido.id}`, data);

      try {
        const response = await req;

        if (response && response.data && response.data.error) {
          notifyError('Hubo un error en los datos ingresados');
          setVisibility(false)
          console.log(response.data.error)
          return;
        }
        notifySuccess('Modificado con Exito!')
        updateList({ ...data, id: contenido.id, malla_data: getSelectMalla(contenido.malla) })
        setVisibility(false)
        console.log(response.data)
      } catch (error) {
        notifyError('Hubo un error al comunicarse con el servidor');
        setVisibility(false)
        console.log(error);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <div>
      <Modal
        open={visibility}
        onClose={() => setVisibility(false)}
        style={{ height: "90%", marginTop: "2.5%" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                  maxHeight: '90%',
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}
              >
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('codigo')} id="outlined-basic" label="Código" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('duracion')} id="outlined-basic" label="Duración" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('unidad_curricular')} id="outlined-basic" label="Nombre de unidad curricular" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <LabelSelect id="demo-simple-select-label">Malla curricular</LabelSelect>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={malla}
                          onChange={(event) => {
                            setMalla(event.target.value)
                          }}
                          label="Age"
                        >
                          {
                            mallasList && mallasList.map((malla) => (<MenuItem value={malla.id}>{malla.codigo}</MenuItem>))
                          }
                        </Select>
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('trayecto')} id="outlined-basic" label="Trayecto" type={'number'} variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('creditos')} id="outlined-basic" label="Creditos" type={'number'} variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('densidad')} id="outlined-basic" label="Densidad" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('hora_academica')} id="outlined-basic" label="Hora de academia" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('htea')} id="outlined-basic" label="HTEA" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('htei')} id="outlined-basic" label="HTEI" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('tipo')} id="outlined-basic" label="Tipo" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListItem>
                      <FormControl fullWidth>
                        <TextField {...getFieldProps('thte')} id="outlined-basic" label="THTE" variant="outlined" />
                      </FormControl>
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListSubheader style={subheader}>Saberes</ListSubheader>
                    <ListItem>
                      <TextareaAutosize
                        maxRows={50}
                        minRows={10}
                        aria-label="maximum height"
                        placeholder="Maximum 50 rows"
                        style={{ width: '100%' }}
                        {...getFieldProps('saberes')}
                      />
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListSubheader style={subheader}>Recursos</ListSubheader>
                    <ListItem>
                      <TextareaAutosize
                        maxRows={50}
                        minRows={10}
                        aria-label="maximum height"
                        placeholder="Maximum 50 rows"
                        style={{ width: '100%' }}
                        {...getFieldProps('recursos')}
                      />
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListSubheader style={subheader}>Estrategias</ListSubheader>
                    <ListItem>
                      <TextareaAutosize
                        minRows={10}
                        maxRows={50}
                        aria-label="maximum height"
                        placeholder="Maximum 50 rows"
                        {...getFieldProps('estrategias')}
                        style={{ width: '100%' }}
                      />
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListSubheader style={subheader}>Evaluación</ListSubheader>
                    <ListItem>
                      <TextareaAutosize
                        minRows={10}
                        maxRows={50}
                        aria-label="maximum height"
                        placeholder="Maximum 50 rows"
                        {...getFieldProps('evaluacion')}
                        style={{ width: '100%' }}
                      />
                    </ListItem>
                  </ul>
                </li>
                <li>
                  <ul>
                    <ListSubheader style={subheader}>Referencias</ListSubheader>
                    <ListItem>
                      <TextareaAutosize
                        minRows={10}
                        maxRows={50}
                        aria-label="maximum height"
                        placeholder="Maximum 50 rows"
                        {...getFieldProps('referencias')}
                        style={{ width: '100%' }}
                      />
                    </ListItem>
                  </ul>
                </li>
              </List>
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
                >
                  Guardar
                </LoadingButton>
              </div>
            </Box>
          </Form>
        </FormikProvider>
      </Modal>
    </div >
  );
}
