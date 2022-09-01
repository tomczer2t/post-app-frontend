import { NavLink, Outlet } from 'react-router-dom';

export const AdminBookmarks = () => {
  return (
      <div className="flex flex-col w-full">
        <ul className="flex justify-between px-4 flex-wrap list-none gap-4">
          <li className="text-slate-500">
            <NavLink to="/account/profile" end className="navlink">
              Added posts
            </NavLink>
          </li>
          <li className="text-slate-500">
            <NavLink to="/account/profile/users" className="navlink">
              All users
            </NavLink>
          </li>
          <li className="text-slate-500">
            <NavLink to="/account/profile/pending-posts" className="navlink">
              Pending posts
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
  );
};
