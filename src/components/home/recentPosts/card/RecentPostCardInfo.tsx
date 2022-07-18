import userDefault from '../../../../assets/images/default-user-img.jpeg';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  username: string;
  avatarURL: string | undefined;
  createdAt: Date;
  postId: string;
}

export const RecentPostCardInfo = (props: Props) => {

  return (
    <div className="z-10 overflow-hidden relative bg-black-80 p-4 h-full sm:h-auto md:h-full lg:h-auto sm:top-1/2 sm:-translate-y-1/4 md:top-0 md:translate-y-0 lg:top-1/2 lg:-translate-y-1/4 ">
      <h4 className="text-white uppercase hover:text-slate-300">
        <Link to={ `/posts/${ props.postId }` }>{ props.title }</Link></h4>
      <div className="flex gap-2 items-center">
        <Link to={ `/authors/${ encodeURI(props.username).toLowerCase() }` } className="flex items-center gap-2 text-slate-300 hover:text-slate-400">
          <div className="aspect-square w-8 overflow-hidden rounded-full bg-slate-600 border-solid border-slate-100">
            <img src={ props.avatarURL || userDefault }
                 className="object-cover aspect-square"
                 alt="" />
          </div>
          <p className="text-sm">
            { props.username }
          </p>
        </Link>
        <p className="hidden sm:block text-slate-500 text-sm">{ formatDistance(new Date(props.createdAt), new Date(), { addSuffix: true }) }</p>
      </div>
    </div>
  );
};
