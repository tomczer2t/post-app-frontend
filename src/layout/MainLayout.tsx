import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header/Header';
import { Footer } from '../components/layout/Footer/Footer';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
