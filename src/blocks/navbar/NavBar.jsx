import Logo from '../../components/Logo';
import NavList from './NavList';
import { twMerge } from 'tailwind-merge';
import { LoginButton } from './LoginButton';
import { Link } from 'react-router-dom';
import { Add, SidebarLeft, SidebarRight } from 'iconsax-react';
import { PlusIcon } from '@heroicons/react/24/outline';

const Bar2 = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-8 w-8"
      >
        <path
          fillRule="evenodd"
          d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};

const NavBar = ({ onSidebarToggle, sidebarIsOpen }) => {
  return (
    <div
      className={twMerge('sticky top-0 z-[2] flex h-16 w-full items-center')}
    >
      <div className="mx-auto flex w-full flex-1 items-center justify-between h-full">
        {sidebarIsOpen && (
          <div className="w-56 flex-shrink-0 hidden sm:flex">
            <Link
              to="/"
              className="router-link-active router-link-exact-active"
            >
              <Logo />
            </Link>
          </div>
        )}
        <div className="flex-grow flex justify-between">
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onSidebarToggle}
              className={twMerge(
                'text-gray-500 hover:text-gray-800 size-6 flex-shrink-0 inline lg:hidden',
              )}
            >
              {sidebarIsOpen ? <SidebarLeft /> : <SidebarRight />}
            </button>
            <Link
              to="/"
              className="router-link-active router-link-exact-active block sm:hidden"
            >
              <Logo />
            </Link>
          </div>
          <div className="flex items-center">
            {/* <NavList /> */}
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
