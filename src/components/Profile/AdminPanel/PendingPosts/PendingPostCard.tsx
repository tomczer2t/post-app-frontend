import defaultImage from '../../../../assets/images/default-post-img.avif';
import { Link } from 'react-router-dom';
import { ErrorModal } from '../../../common/modals/ErrorModal';
import { useState } from 'react';
import { useAxiosPrivate } from '../../../../hooks/useAxiosPrivate';
import { PostStatus, TinyPost } from 'types';
import userDefault from '../../../../assets/images/default-user-img.jpeg';
import { formatDistance } from 'date-fns';

interface Props {
  post: TinyPost;
  fetchPosts: () => Promise<void>;
}

export const PendingPostCard = ({ fetchPosts, post }: Props) => {

  const [isRejetActive, setIsRejectActive] = useState(false);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleReject = async () => {
    try {
      await axiosPrivate.patch(`/posts/${ post.id }/status`, { status: PostStatus.REJECTED });
      await fetchPosts();
    } catch (e) {
      setError(true);
    }
  };

  const handleAccept =  async () => {
    try {
      await axiosPrivate.patch(`/posts/${ post.id }/status`, { status: PostStatus.ACCEPTED });
      await fetchPosts();
    } catch (e) {
      setError(true);
    }
  }

  return (
    <div className="w-full border-solid border-slate-200 border-2 rounded-xl my-4 flex flex-col lg:flex-row-reverse overflow-hidden">
      <div className="overflow-hidden flex justify-center items-center flex-shrink-0">
        <img src={ post.photoURL ? post.photoURL : defaultImage }
             className="aspect-video object-center object-cover min-h-full lg:aspect-square lg:max-w-[250px]"
             alt="" />
      </div>

      <div className="flex flex-col">
        <div className="pl-2">
          <Link to={`/authors/${ encodeURI(post.username).toLowerCase() }`} className="flex flex-wrap justify-start items-center gap-x-2 text-slate-500 hover:text-slate-600  transition-colors duration-300 ">
            <div className="aspect-square w-8 overflow-hidden rounded-full bg-slate-600 border-solid border-slate-100">
              <img src={ post.avatarURL ? post.avatarURL : userDefault }
                   className="object-cover aspect-square"
                   alt="" />
            </div>
            <p className="text-sm">
              { post.username }
            </p>
            <p className="text-slate-400 text-sm">{ formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true }) }</p>
          </Link>
        </div>
        <div className="pb-2 px-2 text-sm flex-grow">
          <p className="font-bold text-slate-600 pt-0 mt-0">{ post.title }</p>
          <p className="hidden sm:block text-xs text-slate-500">{ post.headline }</p>
        </div>
        <div className="flex flex-wrap gap-2 m-2 justify-start">
          <Link className=" w-full sm:w-auto"
                to={ `/posts/${ post.id }` }>
            <button className="rounded-md py-2 px-4 bg-slate-500 text-white w-full sm:w-auto">Show</button>
          </Link>
          <button className="rounded-md py-2 px-4 bg-slate-600 text-white w-full sm:w-auto" onClick={ handleAccept }>Accept</button>
          { !isRejetActive && (
            <button className="rounded-md py-2 px-4 bg-slate-800 text-white w-full sm:w-auto"
                    onClick={ () => setIsRejectActive(true) }>Reject</button>
          ) }
          { isRejetActive && (
            <div className="flex w-full sm:w-auto">
              <button className="bg-red-600 rounded-l-md px-4 text-white py-2 w-1/2 sm:w-auto"
                      onClick={ handleReject }>Yes
              </button>
              <button className="bg-green-700 rounded-r-md px-4 text-white py-2 w-1/2 sm:w-auto"
                      onClick={ () => setIsRejectActive(false) }>No
              </button>
            </div>
          ) }
        </div>

        <ErrorModal error={ error } close={ () => setError(false) }>
          <p>Something went wrong</p>
        </ErrorModal>
      </div>
    </div>
  );
};
