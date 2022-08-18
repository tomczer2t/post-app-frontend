import { useAuth } from '../../hooks/useAuth';
import userDefault from '../../assets/images/default-user-img.jpeg';
import { FollowInfo } from './FollowInfo';
import { UserTopBar } from './UserTopBar';
import { ProfileEditor } from './ProfileEditor';

export const ProfileInfo = () => {

  const { auth } = useAuth();

  if (!auth) return null;

  return (
    <div className="p-4 md:w-[300px] lg:w-[320px] flex-shrink-0">
      <UserTopBar />
      <ProfileEditor />
      <FollowInfo />
    </div>
  );
};
