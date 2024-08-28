import { Outlet } from 'react-router-dom';

import Nav from './components/Nav';

export default function MainLayout() {
  return (
    <div className="mb-4">
      <Nav />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}
