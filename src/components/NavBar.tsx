import {
  AppBar, Button, Toolbar, Typography, Divider,
} from '@mui/material'; // Import the AppBar component from the Material UI library
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';

export default function NavBar() {
  const {
    isAuthenticated, user, loginWithRedirect, logout,
  } = useAuth0();
  if (isAuthenticated) {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Nesterines Flights</Link>
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', flexGrow: 0, marginRight: 3 }}>
            {user?.nickname || ''}
          </Typography>
          <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: 10 }}>
            My Profile
          </Link>
          <Divider orientation="vertical" flexItem style={{ marginRight: 10 }} variant="middle" />
          <Link href="/flights" style={{ textDecoration: 'none', color: 'inherit', marginRight: 10 }}>
            Check Flights
          </Link>
          <Divider orientation="vertical" flexItem style={{ marginRight: 10 }} variant="middle" />
          <Link href="/recommendations" style={{ textDecoration: 'none', color: 'inherit', marginRight: 10 }}>
            Check Recommendations
          </Link>
          <Divider orientation="vertical" flexItem style={{ marginRight: 10 }} variant="middle" />
          <Button
            variant="contained"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            sx={{ backgroundColor: '#fff', color: '#222' }}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Nesterines Flights</Link>
        </Typography>
        <Button variant="contained" onClick={() => loginWithRedirect()} sx={{ backgroundColor: '#fff', color: '#222' }}>
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
}
