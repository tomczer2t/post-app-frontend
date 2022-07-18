import { PostsList } from '../posts/PostsList';
import { AuthorHeader } from './AuthorHeader';
import { axios } from '../../api/axios';
import { useEffect, useState } from 'react';
import { PostsListAllResponse, TinyPost } from 'types';
import { useParams } from 'react-router-dom';
import { Loading } from '../common/loading/Loading';


export const Author = () => {

  const [posts, setPosts] = useState<TinyPost[]>([]);
  const [authorInfo, setAuthorInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { author } = useParams();

  useEffect(() => {
    if (!author) {
      setError('Author required');
      return;
    }
    fetchAuthorPosts(author);
  }, []);

  const fetchAuthorPosts = async (author: string) => {
    try {
      const { data } = await axios.get(`users?username=${ author }`) as { data: PostsListAllResponse };
      setPosts(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="px-4">
      <Loading loading={ loading } />
      { !loading && (
        <>
          <AuthorHeader username={posts[0].username} avatarURL={posts[0].avatarURL} />
          <PostsList tinyPosts={ posts } />
        </>
      ) }
    </article>
  );
};
