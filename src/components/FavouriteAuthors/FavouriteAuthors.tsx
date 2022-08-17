import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { Loading } from '../common/loading/Loading';
import { useAuth } from '../../hooks/useAuth';
import { BookmarkHeader } from '../common/BookmarkHeader/BookmarkHeader';
import { Author } from 'types';
import { FavouriteAuthorsList } from './FavouriteAuthorsList';

export const FavouriteAuthors = () => {

  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (auth) {
      getFavouriteAuthors();
    }
  }, [auth]);

  const getFavouriteAuthors = async () => {
    const { data } = await axiosPrivate.get<Author[]>('users/favourite-authors');
    setAuthors(data);
    setLoading(false);
  }

  return (
    <div className="text-center pb-16">

      <BookmarkHeader>
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
          <h2>Favourite authors</h2>
        </div>
      </BookmarkHeader>
      <Loading loading={loading} className="text-8xl mt-20 mx-auto"/>
      <FavouriteAuthorsList  authors={ authors }/>
    </div>
  );
};
