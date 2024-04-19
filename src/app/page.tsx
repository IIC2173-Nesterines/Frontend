'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Box } from '@mui/material';
import NavBar from '@/components/NavBar';
import FlightsDashboard from '@/components/FlightsDashboard';

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Box className="flex w-full h-full items-center justify-center">Loading...</Box>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <Box className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
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
