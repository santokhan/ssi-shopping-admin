import React from 'react';
import { sidebarNavs } from '../utils/sidebar-navs';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <ul>
                {sidebarNavs.map((item, index) => {
                    const { label, to } = item;
                    return (
                        <li key={index}>
                            <Link to={to} className='block py-2.5 px-4 rounded-lg font-medium hover:bg-gray-100'>{label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
