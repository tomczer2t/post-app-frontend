import { TinyPost } from 'types';
import defaultImage from '../../assets/images/default-post-img.avif';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import userDefault from '../../assets/images/default-user-img.jpeg';



interface Props {
  post: TinyPost;
}


export const PostCard = ({ post }: Props) => {
  return (
    <article className="max-w-[800px] m-auto p-4 border-solid border-t-0 border-l-0 border-r-0 border-b-slate-400 mb-10 pb-14">
      <div className="flex flex-col-reverse sm:flex-row ">
        <div className="sm:flex-1 text-left sm:mr-4">
          <div className="">
            <Link to={`/authors/${ encodeURI(post.username).toLowerCase() }`} className="flex justify-start items-center gap-x-2 text-slate-400 hover:text-slate-500  transition-colors duration-300 ">
              <div className="aspect-square w-8 overflow-hidden rounded-full bg-slate-600 border-solid border-slate-100">
                <img src={ post.avatarURL ? post.avatarURL : userDefault }
                     className="object-cover aspect-square"
                     alt="" />
              </div>
              <p className="text-sm">
                { post.username }
              </p>
            </Link>
          </div>
          <p className="text-slate-500 hover:text-slate-400 transition-colors duration-300 font-bold text-xl">
            <Link to={ `/posts/${post.id}` }>{ post.title }</Link>
          </p>
          <p className="text-sm sm:text-md"> { post.headline }</p>
          <p className="text-slate-400 text-sm">{ formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true }) }</p>
        </div>
        <div className="overflow-hidden flex justify-center items-center sm:rounded-md cursor-pointer">
          <Link to={ `/posts/${post.id}` }>
            <img src={ post.photoURL ? post.photoURL : defaultImage }
                 className="aspect-video object-center object-cover scale-125 hover:scale-110 min-h-full duration-1000 transition-transform sm:aspect-square sm:max-w-[250px]"
                 alt="" />
          </Link>
        </div>
      </div>
    </article>
  );
};
