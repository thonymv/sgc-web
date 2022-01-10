import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Box,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal
} from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, HistorialListToolbar, UserMoreMenu } from '../components/_dashboard/user';

const TABLE_HEAD = [
  { id: 'Usuario', label: 'Actual', alignRight: false },
  { id: 'lastname', label: 'Hoy', alignRight: false },
  { id: 'lastname', label: 'Semana', alignRight: false },
  { id: 'lastname', label: 'Mes', alignRight: false },
  { id: 'lastname', label: 'Año', alignRight: false },
  { id: 'lastname', label: 'Total', alignRight: false },
  { id: '', label: '', alignRight: true }
];

const TABLE_HEAD2 = [
  { id: 'lastname', label: 'Hoy', alignRight: false },
  { id: 'lastname', label: 'Semana', alignRight: false },
  { id: 'lastname', label: 'Mes', alignRight: false },
  { id: 'lastname', label: 'Año', alignRight: false },
  { id: 'lastname', label: 'Total', alignRight: false },
  { id: '', label: '', alignRight: true }
];

const TitlesStyle1 = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center'
};

const TitlesStyle2 = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: '4%'
};
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Estadisticas() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(null);

  const navigate = useNavigate();

  const [USERLIST, setUSERLIST] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  function getUsers() {
    axios.get(`http://localhost:8001/usuarios`).then((res) => {
      const persons = res.data;
      setUSERLIST(persons);
      console.log(persons);
    });
  }
  useEffect(() => {
    getUsers();
  }, []);

  function goNewUser() {
    navigate('/dashboard/NewUser');
  }

  return (
    <Page title="Usuarios | SGC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Estadisticas
          </Typography>
        </Stack>
        <Typography style={TitlesStyle1}>Tú</Typography>
        <Card style={{ marginBottom: '1%', maxWidth: 700, marginLeft: '10%' }}>
          <Scrollbar>
            <TableContainer sx={{ maxWidth: 700, marginLeft: '-1700' }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD2}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { ci, nomb1, nomb2, apel1, apel2 } = row;
                      const status = true;
                      return (
                        <TableRow>
                          <TableCell padding="checkbox" />
                          <TableCell align="left">{`${nomb1} ${nomb2}`}</TableCell>
                          <TableCell align="left">{`${apel1} ${apel2}`}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <Typography style={TitlesStyle2}>Todos los usuarios</Typography>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 100, marginLeft: '-1700' }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { ci, nomb1, nomb2, apel1, apel2 } = row;
                      const status = true;
                      return (
                        <TableRow>
                          <TableCell padding="checkbox" />
                          <TableCell align="left">{`${nomb1} ${nomb2}`}</TableCell>
                          <TableCell align="left">{`${apel1} ${apel2}`}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por paginas:"
          />
        </Card>
      </Container>
    </Page>
  );
}
