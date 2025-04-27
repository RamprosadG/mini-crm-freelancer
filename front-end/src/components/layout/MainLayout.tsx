/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/store/hook';

const links = [
  { name: 'Dashboard', to: '/' },
  { name: 'Projects', to: '/project' },
  { name: 'Clients', to: '/client' },
];

const MainLayout = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate])

  return (
    <div>
      <Header items={links} />
      <Sidebar items={links} />
      <main className="mx-4 md:mx-10 my-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
};

export default MainLayout;
