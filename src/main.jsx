import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from 'root/Providers';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <Providers />
  </React.StrictMode>,
);
