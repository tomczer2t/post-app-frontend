import { useEffect, useState } from 'react';
import { PostsListAllResponse, TinyPost } from 'types';
import { axios } from '../../api/axios';
import { PostCard } from './PostCard';
import { Loading } from '../common/loading/Loading';
import { useParams } from 'react-router-dom';

interface Props {
  tinyPosts?: TinyPost[];
}

export const PostsList = ({ tinyPosts = [] }: Props) => {

  const [posts, setPosts] = useState<TinyPost[]>(tinyPosts);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { author } = useParams();

  useEffect(() => {
    if (tinyPosts?.length > 0) {
      console.log(tinyPosts[0]);
      setLoading(false);
      return;
    };
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`posts`) as { data: PostsListAllResponse};
      setPosts(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-center py-16">

      <Loading loading={loading} className="text-8xl mt-20 mx-auto"/>
      { posts.map(post => <PostCard post={ post }
                                    key={ post.id } />) }
    </div>
  );
};
