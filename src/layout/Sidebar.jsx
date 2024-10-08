import React, { useContext } from 'react';
import { sidebarNavs } from '../utils/sidebar-navs';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Sidebar = ({ onSidebarToggle }) => {
  const location = useLocation();
  const pathName = location.pathname;

  const matcher = (path) => {
    // Its need be seperate condtion.
    // Because of nested routing without forslash { to: "nested" }
    if (path == '/') {
      return pathName === path;
    } else {
      return pathName.split('/')[1].includes(path);
    }
  };

  return (
    <ul className="space-y-1">
      {sidebarNavs?.map((item, index) => {
        const { label, to } = item;
        return (
          <li key={index}>
            <Link
              to={to}
              onClick={onSidebarToggle}
              className={twMerge(
                'block py-2.5 px-4 rounded-lg font-semibold capitalize',
                matcher(to)
                  ? 'bg-[#6CB93B] text-gray-50'
                  : 'text-gray-800 hover:bg-gray-100',
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
