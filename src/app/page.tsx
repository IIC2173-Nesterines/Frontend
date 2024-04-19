'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Button, Typography, Box,
} from '@mui/material';
import FlightsDashboard from '@/components/FlightsDashboard';
import { useEffect, useState } from 'react';
import { UserAPI } from './api/user.api';

export default function Home() {
  const { user, isLoading } = useUser();
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);

  useEffect(() => {
    if (user && !isEffectExecuted) {
      const registerUserToDB = async () => {
        if (user) {
          const userId = user?.sub || '';
          const email = user?.email || '';
          const username = user?.nickname || '';

          // Check if user exists in the system
          const existingUser = await UserAPI.checkUser(userId);

          // If user does not exist, create a new user
          if (!existingUser.data) {
            await UserAPI.login({ sessionId: userId, email, username });
          }

          setIsEffectExecuted(true);
        }
      };
      registerUserToDB();
    }
  }, [isEffectExecuted, user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <Box className="flex w-full h-full flex-col items-center mt-6 gap-8 justify-center mt-16">
          <Typography variant="body1" className="text-black">
            Welcome
            {' '}
            {user?.name || ''}
            {' '}
            !
          </Typography>
          <Button variant="contained" href="/api/auth/logout" className="w-1/6">Sign out</Button>
          <FlightsDashboard />
        </Box>
      ) : (
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography variant="body1" className="text-black">You are not logged in</Typography>
          <Button variant="contained" href="/api/auth/login">Log in</Button>
        </Box>
      )}
    </main>
  );
}
