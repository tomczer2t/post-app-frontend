import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

export const FavouriteAuthors = () => {

  const { auth } = useAuth();

  useEffect(() => {
    console.log(auth?.user.favouriteAuthors);
  }, []);

  return (
    <div>
      Favourite authors posts
    </div>
  );
};
