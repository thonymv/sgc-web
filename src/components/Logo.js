import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import logo from './logo.svg'
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={logo} sx={{ width: 250, ...sx }} />;
}
