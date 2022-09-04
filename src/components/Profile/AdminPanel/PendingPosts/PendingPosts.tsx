import { TinyPost } from 'types';
import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../../../hooks/useAxiosPrivate';
import { PendingPostCard } from './PendingPostCard';

export const PendingPosts = () => {

  const [posts, setPosts] = useState<TinyPost[]>([]);
  const axiosPrivate = useAxiosPrivate();

  const fetchPendingPosts = async () => {
    const { data } = await axiosPrivate.get<TinyPost[]>('/posts/pending');
    setPosts(data);
  };

  useEffect(() => {
    void fetchPendingPosts();
  }, []);

  return (
    <div>
      { posts.length > 0 ?
        <>
          { posts.map(post => <PendingPostCard post={ post }
                                               fetchPosts={ fetchPendingPosts }
                                               key={ post.id } />) }
        </> : <>
          <p className="text-center pt-6 font-bold">
            Lack of pending posts.
          </p>
        </> }
    </div>
  );
};
