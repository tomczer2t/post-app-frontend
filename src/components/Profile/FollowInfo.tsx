import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const FollowInfo = () => {

  const [followInfo, setFollowInfo] = useState({ followers: 0, following: 0 });
  const followers = followInfo.followers;
  const following = followInfo.following;


  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
      void fetchFollowInfo();
  }, []);

  const fetchFollowInfo = async () => {
    const { data } = await axiosPrivate.get('/users/follow-info');
    setFollowInfo(data);
  }

  return (
    <div className="flex gap-2 text-slate-600">
      <p>
        { followers } follower{ followers !== 1 && 's' }
      </p>
      <p>
        { following } following
      </p>
    </div>
  );
};
