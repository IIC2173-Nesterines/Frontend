'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from '@/components/NavBar';
import ProfileInfo from '@/components/ProfileInfo';

const ProfilePage = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen w-full flex-col bg-white justify-center">
      <NavBar />
      <div className="flex w-full h-full flex-col items-center gap-8">
        {user ? (
          <ProfileInfo userId={user.sub} />
        ) : (
          <div>No user logged in.</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
