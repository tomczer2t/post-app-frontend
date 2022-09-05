import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from './Avatar/Avatar';

export const UserTopBar = () => {

  const { auth } = useAuth();

  if (!auth) return null;
  return (
    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 flex-wrap">
      <Avatar  avatarURL={ auth.user.avatarURL }/>
      <p className="text-slate-500 text-xl md:my-2">{ auth.user.username }</p>
    </div>
  );
};
