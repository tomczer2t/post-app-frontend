import React, { useState } from 'react';
import defaultImage from '../../../../assets/images/default-post-img.avif';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  photoURL: string | undefined;
  postId: string;
}

export const RecentPostCardWrapper = ({ children, photoURL, postId }: Props) => {

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
      <div className="relative aspect-4/3 bg-slate-100 w-full overflow-hidden"
           onMouseEnter={ handleMouseEnter }
           onMouseLeave={ handleMouseLeave }>
        <Link to={ `/posts/${ postId }` }>
        <img src={ photoURL || defaultImage }
             className={ `hover:cursor-pointer absolute z-0 inset-0 object-cover h-full w-full transition-transform ${ hover ? 'scale-125' : 'scale-100' } duration-1000` }
             alt="" />
        </Link>
        { children }
      </div>
  );
};
