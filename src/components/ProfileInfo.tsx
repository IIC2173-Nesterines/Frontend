import React from 'react';
import {
  Card, CardContent, Typography, Grid, Avatar,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileInfo() {
  const { user } = useUser();

  if (user) {
    return (
      <Card sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 2,
      }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item>
                  <Avatar alt="Profile Picture" src={user?.picture} />
                </Grid>
                <Grid item>
                  <Typography variant="h4" component="div" sx={{ marginLeft: 2 }}>
                    {user?.nickname || ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary">
                Email:
                {' '}
                <strong>{user?.email}</strong>
              </Typography>
            </Grid>
            {/* Agrega más detalles del perfil del usuario aquí */}
            <Grid item xs={12} />
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
