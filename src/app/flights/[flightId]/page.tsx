'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from '@/components/NavBar';
import FlightInfo from '@/components/FlightInfo';

export default function FlightPage({ params }: { params: { flightId: string } }) {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <div className="flex w-full h-full flex-col items-center mt-6 gap-8">
          <NavBar />
          <h1 style={{ color: 'black' }}>
            Flight ID:
            {' '}
            {params.flightId}
          </h1>
          <FlightInfo />
        </div>
      ) : (
        <div className="flex w-full h-full flex-col items-center mt-6 gap-8">
          <NavBar />
        </div>
      )}
    </main>
  );
}
