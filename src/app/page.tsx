'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Box } from '@mui/material';
import NavBar from '@/components/NavBar';

export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <Box className="flex w-full h-full flex-col items-center mt-6 gap-8">
          <NavBar />
        </Box>
      ) : (
        <Box className="flex w-full h-full flex-col items-center mt-6 gap-8">
          <NavBar />
        </Box>
      )}
    </main>
  );
}
