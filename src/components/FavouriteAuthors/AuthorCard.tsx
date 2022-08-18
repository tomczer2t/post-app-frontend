import { Author } from 'types';
import userDefault from '../../assets/images/default-user-img.jpeg';

interface Props {
  author: Author;
}

export const AuthorCard = ({ author }: Props) => {


  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-slate-300 w-full relative my-8 h-64 md:h-44">
      <div className="flex md:w-[500px] min-w-[260px] mb-5 md:mb-0">
        <div className="aspect-square w-16 overflow-hidden rounded-full bg-slate-600">
          <img src={ author.avatarURL ? author.avatarURL : userDefault }
               className="object-cover aspect-square"
               alt="" />
        </div>
        <div className="flex flex-col relative w-full items-start justify-center">
          <p className="font-bold ml-2 text-slate-700 my-0">{ author.username }</p>
          <p className="my-0 ml-2 text-slate-400 text-sm">Total posts: <span>{ author.postsCount }</span></p>
        </div>
      </div>

      <div className="bg-slate-200 border-solid border-white shadow rounded-md md:absolute right-4 -top-6 w-full max-w-[300px] md:w-2/5 z-10 h-56 flex flex-col">
        <div className="aspect-video h-32 overflow-hidden flex-shrink-0 relative">
          <img src={ author.lastPost?.photoURL }
             className="aspect-video object-center object-cover scale-150 hover:scale-125 duration-1000 transition-transform"
             alt="" />
          <div className="absolute top-2 -left-8 -rotate-45 bg-slate-500 p-2 px-8">
            <span className="text-white text-sm">Last post</span>
          </div>
        </div>
        <p className="font-bold text-slate-600 text-sm md:text-[1rem]">
          { author.lastPost?.title }
        </p>
      </div>

      <div className="h-4 bg-white w-full absolute left-0 bottom-4"/>
      <div className="h-4 bg-white w-full absolute left-0 top-4 hidden md:block"/>
    </div>
  );
};
