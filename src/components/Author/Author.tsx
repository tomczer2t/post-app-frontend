import { PostsList } from '../posts/PostsList';
import { AuthorHeader } from './AuthorHeader';
import { axios } from '../../api/axios';
import { useEffect, useState } from 'react';
import { PostsListAllResponse, TinyPost } from 'types';
import { useParams } from 'react-router-dom';
import { Loading } from '../common/loading/Loading';
import { BookmarkHeader } from '../common/BookmarkHeader/BookmarkHeader';
import { Searchbar } from '../Searchbar/Searchbar';
import { PostCard } from '../posts/PostCard';
import { Pagination } from '../Pagination/Pagination';


export const Author = () => {

  const [posts, setPosts] = useState<TinyPost[]>([]);
  const [authorInfo, setAuthorInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { author } = useParams();

  useEffect(() => {
    if (!author) {
      setError('Author required');
      return;
    }
    fetchAuthorPosts(author);
  }, []);

  const fetchAuthorPosts = async (author: string) => {
    try {
      const { data } = await axios.get<TinyPost[]>(`users?username=${ author }`);
      setPosts(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="px-4">
      <Loading loading={ loading } />
      { !loading && posts.length !== 0 && (
        <>
          <AuthorHeader username={ posts[0].username }
                        avatarURL={ posts[0].avatarURL } />
          <Loading loading={ loading }
                   className="text-8xl mt-20 mx-auto" />
          {/*<SortByPanel />*/}
          <div className="flex flex-col items-center">
            { posts.map(post => <PostCard post={ post }
                                          key={ post.id } />) }
            {/*<Pagination totalPages={ totalPages } currentPage={ searchParams.has('page') ? Number(searchParams.get('page')) : 1 }/>*/}
          </div>
        </>
      ) }
    </article>
  );
};
