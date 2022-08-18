import { ProfileInfo } from './ProfileInfo';
import { ProfilePosts } from './ProfilePosts';

export const Profile = () => {

  return (
    <div className="max-w-[1000px] mx-auto py-4 flex flex-col md:flex-row">
      <ProfileInfo />
      <ProfilePosts />
    </div>
  );
};
