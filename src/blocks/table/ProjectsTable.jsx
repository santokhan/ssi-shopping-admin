import { Fragment, useState } from 'react';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import TableSummary from '../../components/table/agent/AgentDescFooter';
import TableSearch from './TableSearch';
import AddButton from '../../components/table/AddButton';
import TableTitle from '../../components/table/TableTitle';
import useAxios from '../../context/useAxios';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import DeleteModal from '../../components/DeleteModal';
import { Link } from 'react-router-dom';
import StatusIndicator from '../../components/StatusIndicator';
import getImageURL from '../../utils/getImageURL';
import Print from '../../components/Print';

function CountryCityArea(country, city, area) {
  if (typeof country === 'string' && typeof city === 'string') {
    return (
      <p className="text-sm text-gray-500 font-normal">
        {area && <span>{area},</span>}
        {city && <span>{city},</span>}
        {country && <span>{country},</span>}
      </p>
    );
  }
}

const ProjectsTableDetailsField = ({ property }) => {
  if (!property) {
    return null;
  } else {
    const image = property.images[0];
    const imageURL = image ? getImageURL(image.image) : '';

    return (
      <div className="flex w-72 flex-row items-center gap-4 rounded-lg text-gray-800">
        <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full bg-gray-50">
          {property.images?.length > 0 && (
            <img
              src={imageURL}
              alt={imageURL}
              className="w-full h-full object-cover rounded-full overflow-hidden"
            />
          )}
        </div>
        <div>
          <h3 className="text-base font-bold leading-relaxed capitalize">
            {property.title}
          </h3>
          <CountryCityArea {...property} />
          <p className="text-sm font-semibold mt-2">
            AED {Intl.NumberFormat().format(property.price)}
          </p>
        </div>
      </div>
    );
  }
};

const ProjectTableActions = ({ property, refetch }) => {
  const { api } = useAxios();

  if (!property) {
    return null;
  }

  const id = property.id;

  function onDelete() {
    api
      .delete('projects/' + id + '/')
      .then((res) => {
        toast(`Deleted`, {
          type: 'success',
        });
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex gap-3">
      <ActionEdit to={`/projects/${id}/edit/description`} />
      <DeleteModal onDelete={onDelete} />
    </div>
  );
};

const ProjectTableRow = ({ property, refetch }) => {
  if (!property) return;

  const AgentLink = ({ agent = null }) => {
    if (agent?.id) {
      return (
        <Link
          to={'/agents/' + agent.id + '/'}
          className="hover:text-blue-500 whitespace-nowrap"
        >
          {agent.display_name}
        </Link>
      );
    }
  };

  return (
    <tr className="border-b bg-white text-gray-800">
      <td className="px-6 py-4 font-medium">
        <ProjectsTableDetailsField property={property} />
      </td>
      <td className="px-6 py-4 font-medium capitalize">
        {property.category?.title}
      </td>
      <td className="px-6 py-4 font-medium capitalize">{property.listed_in}</td>
      <td className="px-6 py-4 font-medium capitalize">
        <AgentLink agent={property.agent} />
      </td>
      <td className="px-6 py-4 font-medium capitalize">
        <StatusIndicator status={property.status ? 'active' : 'inactive'} />
      </td>
      <td className="px-6 py-4 capitalize">
        <ProjectTableActions property={property} refetch={refetch} />
      </td>
    </tr>
  );
};

const tableTitle = 'All Projects';

const TableTopSection = ({ onSearch = (needle) => {} }) => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="w-full md:w-1/2">
        <TableTitle>{tableTitle}</TableTitle>
      </div>
      <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <TableSearch onFilter={onSearch} />
        <AddButton to="/projects/create/description">
          Add new projects
        </AddButton>
      </div>
    </div>
  );
};

const ProjectsTable = ({ projects, refetch, page_size, setPageNumber }) => {
  projects = projects?.results;
  const [filtered, setFiltered] = useState(projects);

  const headList = [
    'listing title',
    'category',
    'listed in',
    'agent',
    'status',
    'action',
  ];

  const TH = ({ children, className = '', ...props }) => (
    <th
      className={twMerge('text-start px-6 py-3 whitespace-nowrap', className)}
      {...props}
    >
      {children}
    </th>
  );

  function onSearch(needle) {
    if (needle && needle.length > 0) {
      // console.log({ needle });
      setFiltered(
        /** Filter agents not already filtered items filteredAgents */
        projects.filter((property) => {
          const target = property.title.trim().toLowerCase();
          const value = needle.trim().toLowerCase();
          console.log({ target, value, result: target.includes(value) });
          return target.includes(value);
        }),
      );
    } else {
      setFiltered(projects);
    }
  }

  return (
    <div className="space-y-4">
      <TableTopSection onSearch={onSearch} />
      {
        // replace agent with your needle
        projects ? (
          <div className="bg-white p-4 space-y-4">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                  <tr>
                    <TH scope="col" className="rounded-l-lg">
                      {headList[0]}
                    </TH>
                    <TH scope="col">{headList[1]}</TH>
                    <TH scope="col">{headList[2]}</TH>
                    <TH scope="col">{headList[3]}</TH>
                    <TH scope="col">{headList[4]}</TH>
                    <TH scope="col" className="rounded-r-lg">
                      {headList[5]}
                    </TH>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((property, i) => {
                    return (
                      <Fragment key={i}>
                        <ProjectTableRow
                          property={property}
                          refetch={refetch}
                        />
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              totalPages={new Array(Math.ceil(projects.length / page_size))
                .fill()
                .map((_, i) => i + 1)}
              currentPage={1}
              setPageNumber={setPageNumber}
              isNextExist={Boolean(projects.next)}
            />
            <TableSummary totalData={projects.length} />
          </div>
        ) : (
          <p className="px-4">No records found</p>
        )
      }
    </div>
  );
};

export default ProjectsTable;
