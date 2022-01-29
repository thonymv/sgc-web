import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import logo from './unexca.png'
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={logo} sx={{ width: 250, ...sx }} />;
}