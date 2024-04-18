'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Button, Typography, Box,
} from '@mui/material';
import FlightsDashboard from '@/components/FlightsDashboard';
import NavBar from '@/components/NavBar';

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <Box className="flex w-full h-full flex-col items-center mt-6 gap-8 justify-center mt-16">
          <NavBar />
          <FlightsDashboard />
        </Box>
      ) : (
        <Box className="flex w-full h-full flex-col items-center mt-6 gap-8 mt-16">
          <NavBar />
        </Box>
      )}
    </main>
  );
}
