import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { Loading } from '../common/loading/Loading';
import { PostCard } from '../posts/PostCard';
import { TinyPost } from 'types';
import { useAuth } from '../../hooks/useAuth';
import { Searchbar } from '../Searchbar/Searchbar';
import { BookmarkHeader } from '../common/BookmarkHeader/BookmarkHeader';
import { Link } from 'react-router-dom';

export const FavouriteAuthors = () => {

  const [posts, setPosts] = useState<TinyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const favouriteAuthors = auth?.user?.favouriteAuthors;
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (auth) {
      fetchPostsByFavAuthors()
    }
  }, [auth]);

  const fetchPostsByFavAuthors = async () => {
    const { data } = await axiosPrivate.get<TinyPost[]>('/posts/favourite-authors');
    console.log(data);
    setPosts(data);
    setLoading(false);
  }

  return (
    <div className="text-center pb-16">

      <BookmarkHeader>
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
          <h2>Posts written by your favourite authors</h2>
          { favouriteAuthors && favouriteAuthors?.length > 0 && (
            <select>
              <option value="">Show</option>
              {favouriteAuthors.map((author) => (
                <option><Link to="/siema">{ author }</Link></option> //todo poprawić na coś co działa
              )) }
            </select>
          )}
        </div>
      </BookmarkHeader>
      <Loading loading={loading} className="text-8xl mt-20 mx-auto"/>
      { posts.map(post => <PostCard post={ post }
                                    key={ post.id } />) }
    </div>
  );
};
