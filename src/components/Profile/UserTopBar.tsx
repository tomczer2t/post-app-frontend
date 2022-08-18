import userDefault from '../../assets/images/default-user-img.jpeg';
import { useAuth } from '../../hooks/useAuth';

export const UserTopBar = () => {

  const { auth } = useAuth();

  if (!auth) return null;
  return (
    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 flex-wrap">
      <div className="aspect-square w-20 md:w-full overflow-hidden rounded-full bg-slate-600 border-solid border-slate-200 border-2">
        <img src={ auth.user.avatarURL ? auth.user.avatarURL : userDefault }
             className="object-cover aspect-square"
             alt="" />
      </div>
      <p className="text-slate-500 text-xl md:my-2">{ auth.user.username }</p>
    </div>
  );
};
