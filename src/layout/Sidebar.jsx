import React from 'react';
import { sidebarNavs } from '../utils/sidebar-navs';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <div>
            <ul>
                {sidebarNavs.map((item, index) => {
                    const { label, to } = item;
                    return (
                        <li key={index}>
                            <Link to={to} className={twMerge(
                                'block py-2.5 px-4 rounded-lg font-medium',
                                pathName == to ? 'bg-gray-800 text-gray-50' : "text-gray-800 hover:bg-gray-100"
                            )}>{label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
