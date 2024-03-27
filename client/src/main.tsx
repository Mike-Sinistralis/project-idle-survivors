import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from 'root/Providers';
import CssBaseline from '@mui/material/CssBaseline';
import { World as WorldLoader } from 'ldtk';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <Providers />
  </React.StrictMode>,
);

WorldLoader.loadRaw('./src/assets/tilemaps/ldtk/dungeon.ldtk').then(async (world) => {
  // You have access to the raw `LDtk` JSON file here
  (window as any).world = world;
  world.levels[0]
});
