import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <nav>Nav</nav>
      <Outlet />
    </>
  );
}
