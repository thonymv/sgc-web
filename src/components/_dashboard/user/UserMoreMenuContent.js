import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import lockOutline from '@iconify/icons-eva/lock-outline';
import powerOutline from '@iconify/icons-eva/power-outline';
// material
import { Menu, MenuItem, Modal, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// Modales
import ModalDeleteContent from '../../../pages/Modales/ContenidoSinoptico/ModalDeleteContent';
import ModalEditContent from '../../../pages/Modales/ContenidoSinoptico/ModalEditContent';
import ModalViewContent from '../../../pages/Modales/ContenidoSinoptico/ModalViewContent';

export default function UserMoreMenuContent() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalDeleteContent, setModalDeleteContent] = useState(false);
  const [modalEditContent, setModalEditContent] = useState(false);
  const [modalViewContent, setModalViewContent] = useState(false);
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
      <ModalDeleteContent visibility={modalDeleteContent} setVisibility={setModalDeleteContent} />
      <ModalEditContent visibility={modalEditContent} setVisibility={setModalEditContent} />
      <ModalViewContent visibility={modalViewContent} setVisibility={setModalViewContent} />
    </>
  );
}
