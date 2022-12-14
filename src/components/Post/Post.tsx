import { useEffect, useState } from 'react';
import { Loading } from '../common/Loading/Loading';
import { axios } from '../../api/axios';
import { PostsGetSpecificResponse } from 'types';
import { useLocation, useParams } from 'react-router-dom';
import { NotFound } from '../common/NotFound/NotFound';
import { formatDistance } from 'date-fns';
import { SuccessModal } from '../common/modals/SuccessModal';

export const Post = () => {

  const [post, setPost] = useState<PostsGetSpecificResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [showSuccessCreationModal, setShowSuccessCreationModal] = useState(false);

  const location = useLocation();
  const isJustCreated = (location.state as { justCreated: boolean })?.justCreated;

  const { postId } = useParams();

  useEffect(() => {
    if (isJustCreated) {
      setShowSuccessCreationModal(true);
    }
    void fetchPost();
  }, [postId, isJustCreated]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`posts/${ postId }`) as { data: PostsGetSpecificResponse };
      setPost(data);
    } catch (error) {
      console.log({ error });
      setNotFoundError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="p-4 max-w-[800px] mx-auto py-12">
      <Loading className="text-8xl mt-16 mx-auto"
               loading={ loading } />
      { post && <>
        <div className=""
             dangerouslySetInnerHTML={ { __html: post.content } } />
        <p className="text-slate-500 text-slate-400 text-sm">
          { post.user.username }
          <span className="text-slate-400">{ formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true }) }</span>
        </p>
        <p className=""></p>
        <SuccessModal close={ () => setShowSuccessCreationModal(false) }
                      success={ showSuccessCreationModal }>
          <p>Post sent for verification. Check its status in your profile.</p>
        </SuccessModal>
      </> }
      <NotFound error={ notFoundError }>
        <p className="text-slate-500">Sorry, post not found.</p>
      </NotFound>
    </article>
  );
};
