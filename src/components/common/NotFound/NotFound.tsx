import React from 'react';
import notFoundImage from '../../../assets/images/404.png';
import { Link } from 'react-router-dom';

interface Props {
  children?: React.ReactNode
  error: boolean;
}

export const NotFound = (props: Props) => {


  if (!props.error) return null

  return (
    <div className="text-center max-w-[500px] mx-auto">
      <div>
        <img src={ notFoundImage }
             alt="not found" />
      </div>
      <div>
        { props.children }
        <Link to="/"><button className="px-4 py-1.5 sm:px-8 sm:py-2 sm:text-lg bg-slate-500 rounded-full text-white">Go Home</button></Link>
      </div>
    </div>
  );
};
