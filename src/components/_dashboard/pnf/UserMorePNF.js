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
import ModalVerUsuario from '../../../pages/Modales/ModalVerUsuario';
import ModalEditPNF from '../../../pages/Modales/ModalEditPNF';
import ModalEditPasswordUser from '../../../pages/Modales/ModalEditPasswordUser';
import ModalDeletePNF from '../../../pages/Modales/ModalDeletePNF';

export default function UserMorePNF({ PnfData , update , deleted , message }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editPasswordUser, setEditPasswordUser] = useState(false);
  const [deletePnf, setDeletePNF] = useState(false);


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
        <MenuItem onClick={() => setEditUser(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={() => setDeletePNF(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <ModalEditPNF visibility={editUser} setVisibility={setEditUser} drop={setIsOpen} PnfData={PnfData} update={update} setMessage={setMessage} />
      <ModalDeletePNF visibility={deletePnf} setVisibility={setDeletePNF} drop={setIsOpen} PnfData={PnfData} deleted={deleted} setMessage={setMessage} />

    </>
  );
}
