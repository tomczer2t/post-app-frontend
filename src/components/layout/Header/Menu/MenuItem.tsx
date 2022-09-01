import { NavLink, useLocation } from 'react-router-dom';
import { Underline } from './Underline';
import React from 'react';

interface Props {
  pathname?: string;
  className?: string;
  label: string;
}

export const MenuItem = ({ pathname = '', className = '', label}: Props) => {
  const location = useLocation();

  return (
    <li>
      <NavLink className={`block px-6 py-2 md:px-2 navlink transition-colors duration-300 hover:text-black ${ className }` }
               end={ location.pathname === '/posts/create'}
               to={`/${ pathname }`}>
        <>
          { label[0].toUpperCase() + label.slice(1) }
          { (location.pathname === '/' + pathname || (location.pathname.startsWith('/account/profile') && pathname === 'account/profile')) && <Underline /> }
        </>
      </NavLink></li>
  );
};
