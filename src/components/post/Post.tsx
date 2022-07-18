import { useEffect, useState } from 'react';
import { Loading } from '../common/loading/Loading';
import { axios } from '../../api/axios';
import { PostsGetSpecificResponse } from 'types';
import { useParams } from 'react-router-dom';
import { NotFound } from '../common/notFound/NotFound';

export const Post = () => {

  const [post, setPost] = useState<PostsGetSpecificResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  const { postId } = useParams();

  useEffect(() => {
    fetchPost()
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`posts/${ postId }`) as { data: PostsGetSpecificResponse};
      setPost(data);
    } catch (error) {
      console.log({ error });
      setNotFoundError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="p-4 max-w-[800px] mx-auto py-12">
      <Loading className="text-8xl mt-16 mx-auto" loading={loading}/>
      { post && <div className="" dangerouslySetInnerHTML={ { __html: post.content } } /> }
      <NotFound error={notFoundError}>
        <p className="text-slate-500">Sorry, post not found.</p>
      </NotFound>
    </article>
  );
};
