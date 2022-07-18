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
                 element={ <PostCreatorView /> } />
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
          <Route path="profile"
                 element={ <ProfileView /> } />
        </Route>

        <Route path="authors">
          <Route path=":author"
                 element={ <AuthorView /> } />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
