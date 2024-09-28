// src/components/NavBar.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserDisplay from './UserDisplay';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Catholic Drive
        </Typography>
        <UserDisplay />
      </Toolbar>
    </AppBar >
  );
};

export default NavBar;