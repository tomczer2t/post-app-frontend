import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SortByPanel = () => {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('desc');
  const [searchParams , setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchParams.set('sortBy', sortBy);
    searchParams.set('order', order);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <select value={ sortBy }
                onChange={ handleChange }>
          <option value="">default</option>
          <option value="title">title</option>
          <option value="author">author</option>
          <option value="createdAt">date</option>
        </select>

        <label>⬆️ <input type="radio"
                                name="order"
                                value="asc"
                                checked={ order === 'asc' }
                                onChange={ (e) => setOrder(e.target.value) } /></label>
        <label>⬇️ <input type="radio"
                                 name="order"
                                 value="desc"
                                 checked={ order === 'desc' }
                                 onChange={ (e) => setOrder(e.target.value) } /></label>

        <button type="submit"
                className="py-1 px-4 bg-slate-500 text-white rounded-xl">sort
        </button>
      </form>
    </div>
  );
};
