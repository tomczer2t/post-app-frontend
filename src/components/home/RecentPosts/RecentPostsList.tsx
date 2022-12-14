import { TinyPost } from 'types';
import { RecentPostCard } from './RecentPostCard/RecentPostCard';

interface Props {
  recentPosts: TinyPost[];
}

export const RecentPostsList = ({ recentPosts }: Props) => {

  return (
    <div className="grid md:grid-cols-2 gap-9 max-w-[1060px] mx-auto">
      { recentPosts.map((post) => (
        <RecentPostCard post={ post }
                        key={ post.id } />
      )) }
    </div>
  );
};
