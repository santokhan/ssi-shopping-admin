import React from 'react';
import { sidebarNavs } from '../utils/sidebar-navs';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Sidebar = ({ routePrefix = '' }) => {
    const location = useLocation();
    const pathName = location.pathname;

    const matcher = (path) => {
        // Its need be seperate condtion.
        // Because of nested routing without forslash { to: "nested" }
        if (path == '/') {
            return pathName === path;
        } else {
            console.log({ pathName, path });
            return pathName == '/' + path
        }
    }

    return (
        <div>
            <ul>
                {sidebarNavs.map((item, index) => {
                    const { label, to } = item;
                    return (
                        <li key={index}>
                            <Link to={to} className={twMerge(
                                'block py-2.5 px-4 rounded-lg font-medium',
                                matcher(to) ? 'bg-gray-800 text-gray-50' : "text-gray-800 hover:bg-gray-100"
                            )}>{label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
