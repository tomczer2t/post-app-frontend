import { TinyPost } from 'types';
import { RecentPostCardWrapper } from './RecentPostCardWrapper';
import { RecentPostCardInfo } from './RecentPostCardInfo';

interface Props {
  post: TinyPost;
}

export const RecentPostCard = ({ post }: Props) => {

  return (
    <RecentPostCardWrapper photoURL={ post.photoURL }
                           postId={ post.id }>
      <RecentPostCardInfo title={ post.title }
                          username={ post.username }
                          avatarURL={ post.avatarURL }
                          createdAt={ post.createdAt }
                          postId={ post.id }
      />
    </RecentPostCardWrapper>
  );
};
