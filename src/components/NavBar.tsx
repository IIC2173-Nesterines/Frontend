import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material'; // Import the AppBar component from the Material UI library
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function NavBar() {
  const { user } = useUser();
  if (user) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Nesterines Flights</a>
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', flexGrow: 0, marginRight: 3 }}>
            {user?.nickname || ''}
          </Typography>
          <Button variant="contained" href="/profile" sx={{ backgroundColor: '#fff', color: '#222', marginRight: 2 }}>
            My Profile
          </Button>
          <Button variant="contained" href="/flights" sx={{ backgroundColor: '#fff', color: '#222', marginRight: 2 }}>
            Check Flights
          </Button>
          <Button variant="contained" href="/api/auth/logout" sx={{ backgroundColor: '#fff', color: '#222' }}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Nesterines Flights</a>
        </Typography>
        <Button variant="contained" href="/api/auth/login" sx={{ backgroundColor: '#fff', color: '#222' }}>
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
}
