import { useEffect, useState } from 'react';
import { PostsListAllResponse } from 'types';
import { axios } from '../../../api/axios';
import { RecentPostsList } from './RecentPostsList';


export const RecentPosts = () => {

  const [recentPosts, setRecentPosts] = useState<PostsListAllResponse>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchRecentPosts();
  }, [])

  const fetchRecentPosts = async () => {
    try {
      const { data } = await axios.get('posts?limit=4') as { data: PostsListAllResponse};
      setRecentPosts(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-auto bg-white px-4 py-12">
      <h3 className="text-center text-slate-500 text-2xl m-0 mb-12 border-r-0 border-b-0 border-l-0 border-solid border-t-slate-500 pt-4">Recent posts</h3>
      <RecentPostsList recentPosts={recentPosts}/>
    </section>
  );
};
