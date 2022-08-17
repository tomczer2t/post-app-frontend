import { Author } from 'types';
import { AuthorCard } from './AuthorCard';

interface Props {
  authors: Author[];
}

export const FavouriteAuthorsList = (props: Props) => {
  return (
    <div className="flex gap-2 flex-wrap max-w-[800px] mx-auto">
      { props.authors.map((author) => (
        <AuthorCard author={ author } key={author.username}/>
      ))}
    </div>
  );
};
