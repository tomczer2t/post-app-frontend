import { useEffect, useState } from 'react';
import leftArrow from '../../assets/images/left-arrow-svgrepo-com.svg';
import rightArrow from '../../assets/images/right-arrow-svgrepo-com.svg';
import { useSearchParams } from 'react-router-dom';

interface Props {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: Props) => {

  const [pages, setPages] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(totalPages);
    if (totalPages <= 3) {
      setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
      return;
    }

    if (currentPage === 1) {
      setPages([1, 2, 3]);
      return;
    }

    if (currentPage < totalPages) {
      setPages([currentPage - 1, currentPage, currentPage + 1]);
      return;
    }

    setPages([currentPage - 2, currentPage - 1, currentPage]);
  }, [searchParams]);


  const lastPage = () => {
    if (currentPage !== totalPages && currentPage < totalPages) {
      searchParams.set('page', totalPages.toString());
      setSearchParams(searchParams);
    }
  };

  const firstPage = () => {
    if (currentPage > 1) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex bg-white rounded-xl">
      <button className="h-8 border-2 border-solid border-r-0 border-slate-500 w-12 rounded-l-lg hover:bg-slate-500 hover:text-white"
              onClick={ firstPage }>
        <img src={ leftArrow }
             className="h-4 fill-blue-200 "
             alt="" />
      </button>
      { pages.map((page, i) => (
        <button key={ i }
                onClick={ () => handlePageChange(page) }
                className={ `h-8 border-2  border-solid border-r-0 border-slate-500 w-12 ${ page === currentPage ? 'underline' : 'no-underline' }` }>{ page }</button>
      )) }
      <button className="h-8 border-2  border-solid border-slate-500 w-12 rounded-r-lg hover:bg-slate-500 hover:text-white"
              onClick={ lastPage }>
        <img src={ rightArrow }
             className="h-4"
             alt="" />
      </button>
    </div>
  );
};
