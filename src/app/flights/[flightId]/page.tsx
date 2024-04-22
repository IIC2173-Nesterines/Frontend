'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from '@/components/NavBar';
import FlightInfo from '@/components/FlightInfo';
import { getMyIP } from '@/utils';

getMyIP().then((locationData) => {
  console.log('Datos de ubicación:', locationData);
}).catch((error) => {
  console.error('Error al obtener los datos de ubicación:', error);
});

export default function FlightPage({ params }: { params: { flightId: number } }) {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex h-screen w-full flex-col bg-white justify-center">
      {user ? (
        <div className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
          <FlightInfo id={params.flightId} />
        </div>
      ) : (
        <div className="flex w-full h-full flex-col items-center gap-8">
          <NavBar />
        </div>
      )}
    </main>
  );
}
