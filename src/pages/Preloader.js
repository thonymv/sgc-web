import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={120}/>
        </div>
    );
}