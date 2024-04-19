'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from '@/components/NavBar';
import FlightsDashboard from '@/components/FlightsDashboard';

export default function FlightsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <div className="flex w-full h-full flex-col items-center mt-6 gap-8 justify-center">
          <NavBar />
          <FlightsDashboard />
        </div>
      ) : (
        <div className="flex w-full h-full flex-col items-center mt-6 gap-8">
          <NavBar />
        </div>
      )}
    </main>
  );
}
