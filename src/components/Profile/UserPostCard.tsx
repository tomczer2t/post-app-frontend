import { UserPost } from 'types';
import defaultImage from '../../assets/images/default-post-img.avif';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { ErrorModal } from '../common/modals/ErrorModal';

interface Props {
  post: UserPost;
  fetchPosts: () => Promise<void>;
}

export const UserPostCard = ({ post, fetchPosts }: Props) => {

  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [error, setError] = useState(false);

  const axiosPrivate = useAxiosPrivate();


  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/posts/${ post.id }`);
      await fetchPosts();
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="w-full border-solid border-slate-200 border-2 rounded-xl my-4 flex flex-col lg:flex-row-reverse overflow-hidden">
      <div className="overflow-hidden flex justify-center items-center flex-shrink-0">
        <img src={ post.photoURL ? post.photoURL : defaultImage }
             className="aspect-video object-center object-cover min-h-full lg:aspect-square lg:max-w-[250px]"
             alt="" />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="p-2 text-sm flex-grow">
          <p className="font-bold text-slate-600">{ post.title }</p>
          <p className="hidden sm:block text-xs text-slate-500">{ post.headline }</p>
        </div>
        <div className="flex flex-wrap gap-2 m-2 justify-start">
          <Link className=" w-full sm:w-auto"
                to={ `/posts/${ post.id }` }>
            <button className="rounded-md py-2 px-4 bg-slate-500 text-white w-full sm:w-auto">Show</button>
          </Link>
          <Link className=" w-full sm:w-auto" to={ `/posts/edit/${ post.id }` }>
            <button className="rounded-md py-2 px-4 bg-slate-600 text-white w-full sm:w-auto">Edit</button>
          </Link>
          { !isDeleteActive && (
            <button className="rounded-md py-2 px-4 bg-slate-800 text-white w-full sm:w-auto"
                    onClick={ () => setIsDeleteActive(true) }>Delete</button>
          ) }
          { isDeleteActive && (
            <div className="flex w-full sm:w-auto">
              <button className="bg-red-600 rounded-l-md px-4 text-white py-2 w-1/2 sm:w-auto"
                      onClick={ handleDelete }>Yes
              </button>
              <button className="bg-green-700 rounded-r-md px-4 text-white py-2 w-1/2 sm:w-auto"
                      onClick={ () => setIsDeleteActive(false) }>No
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
