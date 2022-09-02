import { AdminBookmarks } from './AdminBookmarks';
import { Route, Routes } from 'react-router-dom';
import { ProfilePosts } from '../ProfilePosts';
import { Users } from './Users';
import { PendingPosts } from './PendingPosts/PendingPosts';

export const AdminPanel = () => {

  return (
    <Routes>
      <Route path="/"
             element={ <AdminBookmarks /> }>
        <Route index
               element={ <ProfilePosts /> } />
        <Route path="users"
               element={ <Users /> } />
        <Route path="pending-posts"
               element={ <PendingPosts /> } />
      </Route>
    </Routes>
  );
};
