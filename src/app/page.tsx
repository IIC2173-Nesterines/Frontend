'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Typography, Box,
} from '@mui/material';
import FlightsDashboard from '@/components/FlightsDashboard';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { UserAPI } from '../api/user.api';

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
