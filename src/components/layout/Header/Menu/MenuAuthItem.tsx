import { Link, useNavigate } from 'react-router-dom';
import React, { MouseEvent } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { useAxiosPrivate } from '../../../../hooks/useAxiosPrivate';


export const MenuAuthItem = () => {

  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await axiosPrivate.delete('auth/logout', { headers: { 'authorization': `Bearer ${auth?.accessToken}` }});
    } finally {
      setAuth(null);
      window.localStorage.removeItem('stay-logged-in');
      navigate('/');
    }
  }

  return (
    <li className="md:ml-auto">
      <div className="flex flex-col md:flex-row">
        {  auth ? (
          <Link onClick={ handleLogout } className="block px-6 py-2 md:px-2 navlink md:bg-slate-500 md:text-white rounded-xl hover:text-black md:hover:text-white md:hover:bg-slate-600 transition-colors duration-200" to="/account/logout">Logout</Link>
        ) : (
          <>
            <Link className="block px-6 py-2 md:px-2 navlink rounded-xl md:mr-2 md:text-slate-500 hover:text-black md:border-slate-50 md:border-solid md:hover:border-slate-500 md:hover:bg-slate-100 transition-colors duration-200" to="/account/login">Sign in</Link>
            <Link className="block px-6 py-2 md:px-2 navlink md:bg-slate-500 md:text-white rounded-xl hover:text-black md:hover:text-white md:hover:bg-slate-600 transition-colors duration-200 flex items-center" to="/account/register">Sign up</Link>
          </>
        ) }
      </div>
    </li>
  );
};
