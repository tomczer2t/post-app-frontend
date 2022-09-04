import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { HomeView } from './views/HomeView';
import { PostCreatorView } from './views/PostCreatorView';
import { RegistrationView } from './views/RegistrationView';
import { LoginView } from './views/LoginView';
import { EmailVerificationView } from './views/EmailVerificationView';
import { PostsView } from './views/PostsView';
import { SpecificPost } from './views/SpecificPost';
import { AuthorView } from './views/AuthorView';
import { ProfileView } from './views/ProfileView';
import { FavouriteAuthorsView } from './views/FavouriteAuthorsView';
import { PostEditorView } from './views/PostEditorView';
import { ChangeEmailVerificationView } from './views/ChangeEmailVerificationView';

function App() {
  return (
    <Routes>
      <Route path="/"
             element={ <MainLayout /> }>

        <Route index
               element={ <HomeView /> } />

        <Route path="posts">
          <Route index
                 element={ <PostsView /> } />
          <Route path="create"
                 element={ <PostEditorView /> } />
          <Route path="edit/:postId"
                 element={ <PostEditorView /> } />
          <Route path=":postId"
                 element={ <SpecificPost /> } />
        </Route>

        <Route path="account">
          <Route path="register"
                 element={ <RegistrationView /> } />
          <Route path="login"
                 element={ <LoginView /> } />
          <Route path="verify/:verificationCode"
                 element={ <EmailVerificationView /> } />
          <Route path="verify/email/:verificationCode"
                 element={ <ChangeEmailVerificationView /> } />
          <Route path="profile/*"
                 element={ <ProfileView /> } />
        </Route>
        <Route path="authors">
          <Route path=":author"
                 element={ <AuthorView /> } />
        </Route>

        <Route path="favourite-authors">
          <Route index
                 element={ <FavouriteAuthorsView /> } />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
