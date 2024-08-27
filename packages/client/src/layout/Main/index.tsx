import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <nav>Nav</nav>
      <Outlet />
    </div>
  );
}
