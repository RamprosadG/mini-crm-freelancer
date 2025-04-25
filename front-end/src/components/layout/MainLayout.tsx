import { Outlet } from 'react-router-dom';

const MainLayout = () => {

  return (
    <div>
      <header className="p-4 bg-gray-100">Dashboard Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
};

export default MainLayout;
