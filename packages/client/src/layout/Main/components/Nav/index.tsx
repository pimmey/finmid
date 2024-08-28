import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import Spinner from '~/components/Spinner';
import { SmeService, UsersService } from '~/data/__generated__';
import LogOutIcon from '~/layout/Main/components/Nav/components/LogOutIcon';
import { getUserDataFromToken, removeToken } from '~/utils/token';

export default function Nav() {
  const currentUser = getUserDataFromToken();
  const { data: smeData, isLoading: isSmeDataLoading } = useQuery({
    queryFn: SmeService.getSmeData,
    queryKey: ['sme-data'],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  function logOut() {
    removeToken();
    navigate('/sign-in');
  }

  return (
    <nav className="sticky top-2 z-50">
      <div className="container mx-auto mb-8 px-4">
        <div className="bg-brand flex justify-between gap-x-4 rounded-3xl bg-opacity-75 px-8 py-4 backdrop-blur-lg">
          <div className="flex items-center justify-between gap-x-2">
            <img src="/logo.png" className="h-6 w-6" />
            <div className="flex items-center gap-x-2">
              <div className="flex">
                {isSmeDataLoading ? <Spinner /> : smeData?.legalName}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex shrink-0 items-center gap-x-2">
              <img
                src={currentUser.profileImage}
                alt={currentUser.name}
                title={currentUser.name}
                className="h-6 w-6 rounded-full"
              />{' '}
              <span className="hidden md:block">{currentUser.name}</span>
            </div>
            |
            <a
              className="flex gap-x-2 underline"
              href="#"
              onClick={e => {
                e.preventDefault();
                logOut();
              }}
            >
              <span className="hidden md:block">Log out</span>
              <LogOutIcon />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
