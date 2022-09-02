import { ProfileInfo } from './ProfileInfo';
import { ProfilePosts } from './ProfilePosts';
import { useAuth } from '../../hooks/useAuth';
import { AdminPanel } from './AdminPanel/AdminPanel';
import { UserRole } from 'types';

export const Profile = () => {

  const { auth } = useAuth();

  return (
    <div className="max-w-[1000px] mx-auto py-4 flex flex-col md:flex-row">
      <ProfileInfo />
      { auth?.user.role === UserRole.ADMIN ? (
        <AdminPanel />
      ) : (
        <ProfilePosts />
      )}
    </div>
  );
};
