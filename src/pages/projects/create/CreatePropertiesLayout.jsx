import React from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import TableTitle from '../../../components/table/TableTitle';
import { formSteps } from '../../../utils/form-steps';
import { devMode } from '../../../utils/env';
import PropertyFormProvider from '../../../context/properties-form-context/create-properties-context';

const tabList = formSteps;

const Tabs = () => {
  const location = useLocation();
  const pathName = location.pathname;
  let pathList = [];
  if (pathName.includes('/edit')) {
    pathList = pathName.split('/edit')[1].split('/').filter(Boolean);
  }
  if (pathName.includes('/create')) {
    pathList = pathName.split('/create')[1].split('/').filter(Boolean);
  }

  return (
    <div className="items-center bg-white flex gap-6 lg:gap-12 px-4 lg:px-6 overflow-x-auto">
      {tabList.map((tab, index) => (
        <Link
          key={index}
          to={devMode ? tab.to : ''}
          className={twMerge(
            'whitespace-nowrap py-3 text-base font-semibold border-b-2 border-transparent hover:outline-none text-gray-700',
            tab.to == pathList[0]
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

const CreateProjectsLayout = () => {
  const { id } = useParams();

  return (
    <PropertyFormProvider>
      <div className="space-y-6">
        <div className="space-y-1">
          <TableTitle>{id ? 'Edit Project' : 'Add Project'}</TableTitle>
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
    </PropertyFormProvider>
  );
};

export default CreateProjectsLayout;
