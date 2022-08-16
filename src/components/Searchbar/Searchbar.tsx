import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { Loading } from '../common/loading/Loading';

interface Props {
  fetchPosts: (term?: string) => Promise<void>;
}

export const Searchbar = ({ fetchPosts }: Props) => {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  useDebounce(async () => {
    if (!term) {
      setLoading(false);
      await fetchPosts();
      return;
    }
    setLoading(true);
    await fetchPosts(term);
    setLoading(false);
  }, 1000, [term]);

  return (
    <div className="h-10 w-full md:basis-3/4 relative px-4">
      <input type="text"
             value={ term }
             onChange={ handleChange }
             className="h-full w-full px-4 border-slate-500 border-solid rounded"
             placeholder="Search by title..."
      />

      <Loading loading={ loading } className="absolute top-2.5 right-6"/>
      { !loading && (
        <button className="absolute top-3 right-5 text-slate-600"
                onClick={ () => setTerm('') }>
          ✕
        </button>
      ) }
    </div>
  );
};
