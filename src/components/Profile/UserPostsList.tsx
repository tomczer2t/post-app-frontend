import { UserPostCard } from './UserPostCard';
import { useEffect, useState } from 'react';
import { UserPost, GetUserPostsResponse } from 'types';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';

export const UserPostsList = () => {

  const [posts, setPosts] = useState<UserPost[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth) return;
    void fetchPosts();
  }, [auth]);

  const fetchPosts = async () => {
    const { data } = await axiosPrivate.get<GetUserPostsResponse>('/users/posts');
    setPosts(data.posts);
  };

  return (
    <div>
      { posts.length > 0 ? <>
        { posts.map((post) => (
          <UserPostCard post={ post }
                        fetchPosts={ fetchPosts }
                        key={ post.id } />
        )) }
      </> : <>
        <p className="text-center pt-6 font-bold">
          Lack of posts added by you.
        </p>
      </>
      }
    </div>
  );
};
