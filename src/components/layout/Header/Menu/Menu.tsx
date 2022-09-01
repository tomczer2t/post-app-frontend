import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toggler } from './Toggler';
import { useAuth } from '../../../../hooks/useAuth';
import { MenuItem } from './MenuItem';
import { MenuAuthItem } from './MenuAuthItem';
import { useRefresh } from '../../../../hooks/useRefresh';


export const Menu = () => {

  const { auth } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const refresh = useRefresh();

  useLayoutEffect(() => {
    if (auth) return;
    (async () => {
      const stayLoggedInJson = window.localStorage.getItem('stay-logged-in');
      if (stayLoggedInJson && JSON.parse(stayLoggedInJson) === true) {
        await refresh();
      }
    })();
  }, [refresh]);


  return (
    <>
      <Toggler showMenu={showMenu} setShowMenu={setShowMenu}/>
      <nav className={`w-full absolute md:relative md:h-auto left-0 top-[60px] md:top-0 overflow-hidden pt-5 md:pt-0 ${showMenu ? 'h-[304px]' : 'h-0'} bg-zinc-50  transition-height duration-300 shadow-md md:shadow-none`}>
        <ul className="list-none flex flex-col md:flex-row w-full text-gray-500 m-0">
          <MenuItem className="md:ml-3" label="home"/>
          <MenuItem label="posts" pathname="posts" />
          { auth && (
            <>
              <MenuItem label="favourite authors" pathname="favourite-authors" />
              <MenuItem label="create post" pathname="posts/create" />
              <MenuItem label="profile" pathname="account/profile" />
            </>
          ) }
          <MenuAuthItem />
        </ul>
      </nav>
    </>
  );
};
