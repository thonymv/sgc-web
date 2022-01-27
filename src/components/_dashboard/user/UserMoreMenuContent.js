import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import lockOutline from '@iconify/icons-eva/lock-outline';
import powerOutline from '@iconify/icons-eva/power-outline';
import filePdfFill from '@iconify/icons-ant-design/file-pdf-twotone';
import { styled } from '@mui/material/styles';
// material
import { Menu, MenuItem, Modal, IconButton, ListItemIcon, ListItemText, Button as ButtonAlias } from '@mui/material';
// Modales
import ModalDeleteContent from '../../../pages/Modales/ContenidoSinoptico/ModalDeleteContent';
import ModalEditContent from '../../../pages/Modales/ContenidoSinoptico/ModalEditContent';
import ModalViewContent from '../../../pages/Modales/ContenidoSinoptico/ModalViewContent';
const API_URL = process.env.API_URL || 'http://localhost:8000';

const Button = styled(ButtonAlias)(({ theme }) => ({
  width: '100%',
  paddingLeft: '1.06em',
  color: '#617282',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  }
}));

export default function UserMoreMenuContent({ updateList, contenido, message, deleteRow }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalDeleteContent, setModalDeleteContent] = useState(false);
  const [modalEditContent, setModalEditContent] = useState(false);
  const [modalViewContent, setModalViewContent] = useState(false);
  const setMessage = (success, text) => {
    if (!message) return;
    if (success) {
      message.notifySuccess(text)
    } else {
      message.notifyError(text)
    }
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} style={{ position: 'relative' }}>
          <Button style={{ opacity: 0 }}>
            <ListItemIcon>
              <Icon icon={filePdfFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="PDF" primaryTypographyProps={{ variant: 'body2' }} />
          </Button>
          <div style={{ width: '100%', left: 0, position: 'absolute' }}>
            <Button href={`${API_URL}/contenido/pdf/${contenido.id}`}>
              <ListItemIcon>
                <Icon icon={filePdfFill} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="PDF" primaryTypographyProps={{ variant: 'body2' }} />
            </Button>
          </div>
        </MenuItem>
        <MenuItem onClick={() => setModalViewContent(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Ver" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={() => setModalEditContent(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={() => setModalDeleteContent(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <ModalDeleteContent visibility={modalDeleteContent} deleteRow={deleteRow} contenido={contenido || {}}
        setMessage={setMessage}
        setVisibility={(value) => {
          setModalDeleteContent(value)
          setIsOpen(value)
        }}
      />
      <ModalEditContent contenido={contenido || {}} updateList={updateList} visibility={modalEditContent} setMessage={setMessage}
        setVisibility={(value) => {
          setModalEditContent(value)
          setIsOpen(value)
        }}
      />
      <ModalViewContent visibility={modalViewContent} contenido={contenido || {}}
        setVisibility={(value) => {
          setModalViewContent(value)
          setIsOpen(value)
        }}
      />
    </>
  );
}
