import { useEffect, useState } from 'react';
import { PostsListAllResponse, TinyPost } from 'types';
import { axios } from '../../api/axios';
import { PostCard } from './PostCard';
import { Loading } from '../common/loading/Loading';
import { useSearchParams } from 'react-router-dom';
import { SortByPanel } from '../SortByPanel/SortByPanel';
import { Pagination } from '../Pagination/Pagination';
import { Searchbar } from '../Searchbar/Searchbar';

interface Props {
  tinyPosts?: TinyPost[];
}

export const PostsList = ({ tinyPosts = [] }: Props) => {

  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState<TinyPost[]>(tinyPosts);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();


  useEffect(() => {
    if (tinyPosts?.length > 0) {
      console.log(tinyPosts[0]);
      setLoading(false);
      return;
    }
    fetchPosts();
  }, [searchParams]);

  const fetchPosts = async (search?: string) => {
    try {
      const page = searchParams.get('page');
      const sortBy = searchParams.get('sortBy');
      const order = searchParams.get('order');

      const { data } = await axios.get<PostsListAllResponse>(`posts`, { params: { sortBy, order, page, search } });
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null
  }

  return (
    <div className="text-center py-16">

      <Loading loading={ loading }
               className="text-8xl mt-20 mx-auto" />
      {/*<SortByPanel />*/}
      <div className="flex flex-col items-center">
        <Searchbar fetchPosts={ fetchPosts }/>
        { posts.map(post => <PostCard post={ post }
                                      key={ post.id } />) }
        <Pagination totalPages={ totalPages } currentPage={ searchParams.has('page') ? Number(searchParams.get('page')) : 1 }/>
      </div>

    </div>
  );
};
