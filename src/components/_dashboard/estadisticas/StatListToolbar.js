import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment
} from '@mui/material';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));

const TitlesStyle1 = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: 10
};


export default function StatListToolbar({ selected }) {
    const [toggle, setToggle] = useState(true);
    return (
        <RootStyle
            sx={{
                ...(selected && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                })
            }}
        >
            <div style={{ width: '100%' }}>
                <Typography align="center" style={TitlesStyle1}>{toggle ? 'Tú' : 'Todos los usuarios'}</Typography>
            </div>
            <div style={{ position: "absolute", right: '1em' }}>
                <Switch checked={toggle} onChange={(event) => setToggle(event.target.checked)} />
            </div>
        </RootStyle>
    );
}