'use client';

import { useAuth0 } from '@auth0/auth0-react';
import NavBar from '@/components/NavBar';
import FlightsDashboard from '@/components/FlightsDashboard';
import {
  Typography, Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { UserAPI } from '../api/user.api';

export default function Home() {
  const { user, isLoading } = useAuth0();
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);

  useEffect(() => {
    if (user && !isEffectExecuted) {
      const registerUserToDB = async () => {
        setIsEffectExecuted(true);
        if (user) {
          const userId = user?.sub || '';
          const email = user?.email || '';
          const username = user?.nickname || '';

          // Check if user exists in the system
          const existingUser = await UserAPI.checkUser(userId);
          console.log(existingUser.data);

          // If user does not exist, create a new user
          if (!existingUser.data) {
            await UserAPI.login({ sessionId: userId, email, username });
          }
        }
      };
      registerUserToDB();
    }
  }, [isEffectExecuted, user]);

  if (isLoading) return <Box className="flex w-full h-full items-center justify-center">Loading...</Box>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <Box className="flex w-full h-full flex-col items-center gap-8 justify-center">
          <NavBar />
          <Typography variant="h4" className="text-black">
            Welcome
            {' '}
            {user?.nickname || ''}
            {' '}
            !
          </Typography>
          <FlightsDashboard />
        </Box>
      ) : (
        <Box className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
        </Box>
      )}
    </main>
  );
}
