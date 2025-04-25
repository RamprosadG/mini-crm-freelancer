import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const isAuth = !!localStorage.getItem('token');

  return isAuth ? (
    <div>
      <header className="p-4 bg-gray-100">Dashboard Header</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedLayout;
