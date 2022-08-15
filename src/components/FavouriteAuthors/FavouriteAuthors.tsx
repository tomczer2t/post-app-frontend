import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { Loading } from '../common/loading/Loading';
import { PostCard } from '../posts/PostCard';
import { TinyPost } from 'types';
import { useAuth } from '../../hooks/useAuth';

export const FavouriteAuthors = () => {

  const [posts, setPosts] = useState<TinyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

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
    <div className="text-center py-16">

      <Loading loading={loading} className="text-8xl mt-20 mx-auto"/>
      { posts.map(post => <PostCard post={ post }
                                    key={ post.id } />) }
    </div>
  );
};
