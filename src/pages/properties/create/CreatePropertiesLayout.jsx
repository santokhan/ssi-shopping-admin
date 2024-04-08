import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import TableTitle from '../../../components/table/TableTitle';

const tabList = [
  {
    name: 'Description',
    to: '',
  },
  {
    name: 'Media',
    to: 'media',
  },
  {
    name: 'Location',
    to: 'location',
  },
  {
    name: 'Details',
    to: 'details',
  },
  {
    name: 'Amenities',
    to: 'amenities',
  },
];

const Tabs = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const pathList = pathName.split('/');

  const pathMatcher = (path) => {
    const target = pathList[3];

    if (path == '' && target == undefined) {
      return true;
    } else {
      return target == path;
    }
  };

  return (
    <div className="items-center bg-white flex gap-6 lg:gap-12 px-4 lg:px-6 overflow-x-auto">
      {/* <pre>{JSON.stringify(pathList, null, 2)}</pre> */}
      {tabList.map((tab, index) => (
        <Link
          key={index}
          to={tab.to}
          className={twMerge(
            'whitespace-nowrap py-3 text-base font-semibold border-b-2 border-transparent hover:outline-none text-gray-700',
            pathMatcher(tab.to)
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent',
          )}
        >
          {index + 1}. {tab.name}
        </Link>
      ))}
    </div>
  );
};

const CreatePropertiesLayout = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <TableTitle>Add New Properties</TableTitle>
        <p className="font-medium text-gray-600">
          We are glad to see you again!
        </p>
      </div>
      <div className="bg-white rounded-xl overflow-hidden shadow">
        <Tabs />

        <hr />

        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CreatePropertiesLayout;
