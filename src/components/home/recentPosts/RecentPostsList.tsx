import { PostsListAllResponse } from 'types';
import { RecentPostCard } from './card/RecentPostCard';

interface Props {
  recentPosts: PostsListAllResponse;
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
