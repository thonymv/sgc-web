import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';


// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Usuarios',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'PNF',
    path: '/dashboard/planestudio',
    icon: getIcon(bookOpenOutline)
  },
  {
    title: 'Contenidos',
    path: '/dashboard/pnf',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Historial',
    path: '/dashboard/historial',
    icon: getIcon(personOutline)
  },
  {
    title: 'Estadisticas',
    path: '/dashboard/estadisticas',
    icon: getIcon(pieChart2Fill)
  }
];

export default sidebarConfig;
