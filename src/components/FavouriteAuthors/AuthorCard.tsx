import { Author } from 'types';

interface Props {
  author: Author;
}

export const AuthorCard = ({ author }: Props) => {



  return (
    <div className="flex p-4 bg-slate-200 basis-1/3 flex-grow">
      <div>
        <p className="font-bold">{ author.username }</p>
        <p>Total posts: <span>{ author.postsCount }</span></p>
      </div>
      <div>
        { author.lastPost?.title }
        <img src={author.lastPost?.photoURL}
             className="h-40"
             alt="" />
      </div>
    </div>
  )
}
