import { Building, Heart, Home2, People, TrendUp, User } from 'iconsax-react';
import React from 'react';
import {
  PropertiesContext,
  PropertiesProvider,
} from '../../context/PropertiesContext';
import {
  ProjectsContext,
  ProjectsProvider,
} from '../../context/ProjectsContext';
import AgentsProvider, { AgentsContext } from '../../context/AgentsContext';

const Card = ({ property }) => {
  const { title, amount, icon } = property;
  return (
    <div className="flex min-w-[260px] flex-1 items-center justify-between gap-8 rounded-lg bg-white p-4 sm:p-6 lg:p-8 shadow">
      <div>
        <p className="mt-0.5 line-clamp-1 lg:text-lg">{title}</p>
        <h2 className="line-clamp-1 text-3xl lg:text-4xl font-bold text-slate-900">
          {amount}
        </h2>
      </div>
      <div className="">
        <div className="grid h-16 lg:h-20 w-16 lg:w-20 place-items-center rounded-full bg-slate-50 p-0 font-medium">
          {icon}
        </div>
      </div>
    </div>
  );
};

const StatusCard = () => {
  const items = [
    {
      title: 'All Properties',
      amount: (
        <PropertiesProvider>
          <PropertiesContext.Consumer>
            {({ properties = [] }) => {
              const count = properties?.results?.length || 0;
              return count;
            }}
          </PropertiesContext.Consumer>
        </PropertiesProvider>
      ),
      icon: <Home2 className="h-8 lg:h-10 w-8 lg:w-10" />,
    },
    {
      title: 'All Projects',
      amount: (
        <ProjectsProvider>
          <ProjectsContext.Consumer>
            {({ projects = [] }) => {
              const count = projects?.results?.length || 0;
              return count;
            }}
          </ProjectsContext.Consumer>
        </ProjectsProvider>
      ),
      icon: <Building className="h-8 lg:h-10 w-8 lg:w-10" />,
    },
    {
      title: 'All Agents',
      amount: (
        <AgentsProvider>
          <AgentsContext.Consumer>
            {({ agents = [] }) => {
              const count = agents?.results?.length || 0;
              return count;
            }}
          </AgentsContext.Consumer>
        </AgentsProvider>
      ),
      icon: <User className="h-8 lg:h-10 w-8 lg:w-10" />,
    },
    // {
    //   title: 'All Properties',
    //   amount: 583,
    //   icon: <People className="h-8 lg:h-10 w-8 lg:w-10" />,
    // },
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-6 lg:mt-10">
      {items.map((property, index) => (
        <Card key={index} property={property} />
      ))}
    </div>
  );
};

export default StatusCard;
